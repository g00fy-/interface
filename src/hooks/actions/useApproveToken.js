import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import { MaxUint256, Zero } from '@ethersproject/constants'

import { useTokenContract } from '@hooks/contracts/useContract'
import { useTxHistory } from '@hooks/useTxHistory'
import { useBlockNumber } from '@hooks/useBlockNumber'
import { CHAIN_INFO_MAP } from '@constants/networks'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useTokenAllowance } from '@hooks/tokens/useTokenAllowance'

import ExplorerToastLink from '@components/ExplorerToastLink'
import { txErrorHandler } from '@utils/txErrorHandler'

export const APPROVAL_STATE = {
  UNKNOWN:      'UNKNOWN',
  NOT_APPROVED: 'NOT_APPROVED',
  PENDING:      'PENDING',
  APPROVED:     'APPROVED',
}

/**
 * @param {Token} token
 * @param {string} spender contract address
 */

export function useApproveToken( token, spender, amountToApprove = MaxUint256 ) {
  const { chainId, account } = useActiveWeb3React()
  const {allowance: currentAllowance, totalSupply } = useTokenAllowance(token, spender)
  const { addTransaction } = useTxHistory()
  const [blockNumber, setBlockNumber] = useBlockNumber(chainId)



  let approvalState
  if (currentAllowance) {
    if (currentAllowance.gte(totalSupply)) {
      approvalState = APPROVAL_STATE.APPROVED
    } else if (amountToApprove?.lte(currentAllowance) ) {
      approvalState = APPROVAL_STATE.APPROVED
    } else {
      approvalState = APPROVAL_STATE.NOT_APPROVED
    }
  } else if (token.isNative) {
    approvalState = APPROVAL_STATE.APPROVED
  } else {
    approvalState = APPROVAL_STATE.UNKNOWN
  }

  const tokenContract = useTokenContract(token)


  const approveToken = useCallback(async () => {
    try {
      if (approvalState !== APPROVAL_STATE.NOT_APPROVED) {
        console.error('approve was called unnecessarily')
        return
      }
      if (!token) {
        console.error('no token')
        return
      }

      if (!tokenContract) {
        console.error('tokenContract is null')
        return
      }

      if (!amountToApprove) {
        console.error('missing amount to approve')
        return
      }

      if (!spender) {
        console.error('no spender')
        return
      }

      const approvalTransaction = await tokenContract.approve(
        spender,// swapAddress,
        amountToApprove,
      )
      addTransaction({
        ...approvalTransaction,
        chainId
      })

      toast(`
        Requesting approval to use from ${token.symbol} on
        ${CHAIN_INFO_MAP[chainId].chainName}
      `)

      const tx = await approvalTransaction.wait()

      addTransaction({ ...tx, chainId })

      if (tx?.status === 1) {
        toast.success(
          <div>
            <div className="w-full">
              Successfully approved usage of {token.symbol} on {CHAIN_INFO_MAP[chainId].chainName}{" "}
            </div>
            <ExplorerToastLink {...tx} chainId={chainId} />
          </div>
        )
      }
      setBlockNumber(tx.blockNumber)
    } catch (err) {
      txErrorHandler(err)
    }
  }, [
    approvalState,
    token,
    tokenContract,
    amountToApprove,
    spender,
    chainId
  ])


  return [approvalState, approveToken]
}

