import _ from 'lodash'

import toast from 'react-hot-toast'

import { txErrorHandler } from '@utils/txErrorHandler'


import { ChainId } from '@constants/networks'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useBlockNumber } from '@hooks/useBlockNumber'
import { useComboSwapContract, useMasterSwapContract } from '@hooks/contracts/useContract'
import { useAllContracts } from '@hooks/contracts/useAllContracts'
import { useMetapoolMap, usePool } from '@hooks/pools/usePools'


import { subtractSlippage } from '@utils/slippage'

import ExplorerToastLink from '@components/ExplorerToastLink'
import { useGetTxArgs } from '@hooks/useGetTxArgs'
import { WETH, ETH } from '@constants/tokens/basic'



export function useApproveAndSwap(poolName) {
  // const swapContract = useMasterSwapContract(poolName)
  const swapContract = useComboSwapContract(poolName)

  const tokenContracts = useAllContracts()
  const { account, chainId } = useActiveWeb3React()

  const metaPoolMap = useMetapoolMap()
  const poolTokens = usePool(poolName)
  const [blockNumber, setBlockNumber] = useBlockNumber(chainId)

  const getTxArgs = useGetTxArgs()

  if (!poolTokens) {
    throw new Error('useApproveAndSwap requires a valid pool name')
  }

  return async function approveAndSwap({
    fromCoin,
    fromAmount,
    toCoin,
    toAmount,
  }) {
    try {
      if (!account) throw new Error('Wallet must be connected')
      if (!swapContract) throw new Error('Swap contract is not loaded')

      // For each token being deposited, check the allowance and approve it if necessary
      const tokenContract = tokenContracts?.[fromCoin.symbol]
      if (tokenContract == null) return
      // if (fromCoin.symbol == ETH.symbol) {
      //   fromCoin = WETH
      // }

      // if (toCoin.symbol == ETH.symbol) {
      //   toCoin = WETH
      // }

      const {
        slippageCustom,
        slippageSelected,
        transactionDeadline,
      } = getTxArgs()

      const minToMint = subtractSlippage(
        toAmount,
        slippageSelected,
        slippageCustom
      )

      const indexFrom = poolTokens.findIndex( i => i.symbol === fromCoin.symbol )
      const indexTo = poolTokens.findIndex( i => i.symbol === toCoin.symbol )


      let swapArgs = [
        indexFrom,
        indexTo,
        fromAmount,
        minToMint,
        transactionDeadline
      ]
      if (fromCoin.symbol == WETH.symbol) {
        swapArgs.push({value: fromAmount})
      }

      let swapTransaction
      if (_.keys(metaPoolMap).includes(poolName)) {
        swapTransaction = await swapContract.swapUnderlying(...swapArgs)
      } else {
        swapTransaction = await swapContract.swap(...swapArgs)
      }
      let fromSymbol
      let toSymbol
      if (fromCoin.symbol == WETH.symbol) {
        fromSymbol = ETH.symbol
      } else {
        fromSymbol = fromCoin.symbol
      }
      if (toCoin.symbol == WETH.symbol) {
        toSymbol = ETH.symbol
      } else {
        toSymbol = toCoin.symbol
      }

      toast(`Initiating swap from ${fromSymbol} to ${toSymbol}`)

      const tx = await swapTransaction.wait()
      if (tx?.status === 1) {

        toast.success(
          <div>
            <div className="w-full">
              {`Successfully swapped ${fromSymbol} to ${toSymbol} `}
            </div>
            <ExplorerToastLink {...tx} />
          </div>
        )
      }
      setBlockNumber(tx.blockNumber)
      return tx
    } catch (err) {
      txErrorHandler(err)
    }
  }
}
