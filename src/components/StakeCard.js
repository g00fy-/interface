import _ from 'lodash'
import { useState } from 'react'

import { commify, formatUnits } from '@ethersproject/units'

import { Zero } from '@ethersproject/constants'

import { useApproveAndStake } from '@hooks/actions/useApproveAndStake'
import { usePoolApyData } from '@hooks/pools/usePoolApyData'

import { useTokenBalance, useStakedBalance } from '@hooks/tokens/useTokenBalances'
import { useTokenInfo } from '@hooks/tokens/useTokenInfo'
import { useClaimStake } from '@hooks/actions/useClaimStake'
import { useWithdrawStake } from '@hooks/actions/useWithdrawStake'
import { usePendingTxWrapper } from '@hooks/usePendingTxWrapper'

import { formatBnMagic, formatCommifyBn } from '@bignumber/format'
import { smartParseUnits } from '@bignumber'

import Card from '@tw/Card'
import Button from '@tw/Button'

import ApyTooltip from '@components/ApyTooltip'

import InteractiveInputRow from '@components/InteractiveInputRow'
import ButtonLoadingSpinner from '@components/ButtonLoadingSpinner'

import { useExternalPoolQuery } from '@hooks/pools/useExternalPoolQuery'

export default function StakeCard({
  token,
  poolLabel,
  rightContent
}) {
  const tokenInfo            = useTokenInfo(token)
  const { poolId, poolName } = tokenInfo

  const approveAndStake = useApproveAndStake(token)
  const withdrawStake   = useWithdrawStake()
  const claimStake      = useClaimStake()

  const stakedBalance = useStakedBalance(poolId)




  const [deposit, setDeposit]   = useState('')
  const [withdraw, setWithdraw] = useState('')

  const [isPending, pendingTxWrapFunc]               = usePendingTxWrapper()
  const [isPendingStake, pendingStakeTxWrapFunc]     = usePendingTxWrapper()
  const [isPendingUnstake, pendingUnstakeTxWrapFunc] = usePendingTxWrapper()

  // TODO: FIX THIS
  const lpTokenBalance = useTokenBalance(token) ?? Zero




  return (
    <Card
      title={
        <StakeCardTitle
          token={token}
          poolLabel={poolLabel}
          rightContent={rightContent}
        />
      }
    >
      <div className='mt-4'>
        <InteractiveInputRow
          title='Stake'
          balanceStr={formatCommifyBn(lpTokenBalance, tokenInfo, 2)}
          onClickBalance={() => {
            setDeposit(formatUnits(lpTokenBalance, 18))
          }}
          value={deposit}
          placeholder={'0.0'}
          onChange={e => setDeposit(e.target.value)}
          disabled={lpTokenBalance.eq(0) || deposit == ''}
          isPending={isPendingStake}
          onClickEnter={async e => {
            const tx = await pendingStakeTxWrapFunc(
              approveAndStake({
                poolId: poolId,
                infiniteApproval: true,
                amount: smartParseUnits(deposit, 18),
              })
            )
            if (tx?.status === 1) {
              setDeposit('')
            }
          }}
        />
        <InteractiveInputRow
          title='Unstake'
          balanceStr={formatCommifyBn(stakedBalance.amount, tokenInfo, 4)}
          onClickBalance={() => {
            setWithdraw(formatUnits(stakedBalance.amount, 18))
          }}
          value={withdraw}
          placeholder={'0.0'}
          onChange={e => setWithdraw(e.target.value)}
          disabled={stakedBalance.amount.eq(0) || withdraw == ''}
          isPending={isPendingUnstake}
          onClickEnter={async () => {
            const tx = await pendingUnstakeTxWrapFunc(
              withdrawStake({
                poolId: poolId,
                toStakeTokenSymbol: token.symbol,
                amount: smartParseUnits(withdraw, 18),
              })
            )
            if (tx?.status === 1) {
              setWithdraw('')
            }
          }}
        />
        <div className='mt-6'>
          <Button
            fancy={true}
            disabled={stakedBalance.reward.eq(0)}
            className='w-full py-4'
            onClick={async () => {
              pendingTxWrapFunc(claimStake({ poolId }))
            }}
          >
            { isPending ?
                <>
                  <span className="animate-pulse">
                    Claiming
                  </span>{" "}
                  <ButtonLoadingSpinner className="ml-2" />
                </>
              :
                <>
                  Claim {formatBnMagic(stakedBalance.reward, tokenInfo, 6)} SYN
                </>
            }
          </Button>
        </div>
      </div>
    </Card>
  )
}



function StakeCardTitle({poolLabel, token, rightContent}) {
  const apyData = usePoolApyData(token) ?? {}
  const baseApyData = useExternalPoolQuery(token)

  let fullyCompoundedApyLabel
  if (_.isFinite(apyData.fullCompoundedAPY)) {
    fullyCompoundedApyLabel = _.round(
      apyData.fullCompoundedAPY + (baseApyData?.yearlyCompoundedApy ?? 0),
      2
    ).toFixed(2)
  } else {
    fullyCompoundedApyLabel =
      <i className="opacity-50"> - </i>
  }

  return (
    <>
      {rightContent &&
        <div className='inline-block float-right'>
          {rightContent}
        </div>
      }
      {poolLabel ?? token.poolName}

      <div> Earning {fullyCompoundedApyLabel}% APY
        <ApyTooltip apyData={apyData} baseApyData={baseApyData} className='ml-1' />
      </div>
    </>
  )
}