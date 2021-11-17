import { parseUnits } from '@ethersproject/units'

import { IMBALANCE, ALL } from '@constants/withdrawTypes'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useBlockNumber } from '@hooks/useBlockNumber'
import {
  useLPTokenContract,
  useSwapDepositContract,
} from '@hooks/contracts/useContract'

import { useGetTxArgs } from '@hooks/useGetTxArgs'

import { addSlippage, subtractSlippage } from '@utils/slippage'
import { checkAndApproveTokenForTrade } from '@utils/checkAndApproveTokenForTrade'







export function useApproveAndWithdraw(poolName) {
  const { account, chainId } = useActiveWeb3React()

  const lpTokenContract = useLPTokenContract(poolName)
  const swapContract = useSwapDepositContract(poolName)


  const [blockNumber, setBlockNumber] = useBlockNumber(chainId)
  const getTxArgs = useGetTxArgs()


  return async function approveAndWithdraw({
    withdrawType,
    lpTokenAmountToSpend,
    inputState,
    poolTokens
  }) {
    try {

      if (!account) throw new Error('Wallet must be connected')
      if (!swapContract) throw new Error('Swap contract is not loaded')
      if (lpTokenAmountToSpend.isZero()) return
      if (lpTokenContract == null) return

      let poolTokenObj = {}
      for (const poolToken of poolTokens) {
        poolTokenObj[poolToken.symbol] = poolToken
      }


      const {
        slippageCustom,
        slippageSelected,
        infiniteApproval,
        transactionDeadline,
      } = getTxArgs()

      let allowanceAmount
      if (withdrawType === IMBALANCE) {
        allowanceAmount = addSlippage(
          lpTokenAmountToSpend,
          slippageSelected,
          slippageCustom
        )
      } else {
        allowanceAmount = lpTokenAmountToSpend
      }

      await checkAndApproveTokenForTrade(
        lpTokenContract,
        swapContract.address,
        account,
        allowanceAmount,
        infiniteApproval,
        {
          onTransactionStart: () => {},
          onTransactionSuccess: () => {},
          onTransactionError: () => {
            throw new Error('Your transaction could not be completed')
          },
        }
      )


      let spendTransaction
      if (withdrawType === ALL) {
        spendTransaction = await swapContract.removeLiquidity(
          lpTokenAmountToSpend,
          poolTokens.map(t =>
            subtractSlippage(
              parseUnits(inputState[t.symbol], t.decimals[chainId]),
              slippageSelected,
              slippageCustom
            )
          ),
          transactionDeadline,
        )
      } else if (withdrawType === IMBALANCE) {
        spendTransaction = await swapContract.removeLiquidityImbalance(
          poolTokens.map(t => parseUnits(inputState[t.symbol], t.decimals[chainId]) ),
          addSlippage(
            lpTokenAmountToSpend,
            slippageSelected,
            slippageCustom
          ),
          transactionDeadline,
        )
      } else {

        const poolTokenIndex = poolTokens.findIndex(i => i.symbol === withdrawType)
        const token = poolTokens[poolTokenIndex]

        spendTransaction = await swapContract.removeLiquidityOneToken(
          lpTokenAmountToSpend,
          poolTokenIndex,
          subtractSlippage(
            parseUnits(inputState[token.symbol], token.decimals[chainId]),
            slippageSelected,
            slippageCustom
          ),
          transactionDeadline,
        )
      }

      const tx = await spendTransaction.wait()
      setBlockNumber(tx.blockNumber)
      return tx
    } catch (e) {
      console.error(e)
      //   clearToasts()
    }
  }
}
