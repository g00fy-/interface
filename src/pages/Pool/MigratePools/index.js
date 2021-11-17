import { commify } from "@ethersproject/units"
import { Zero } from "@ethersproject/constants"

import { getCardStyleByPool } from "@styles/coins"
import { ALL, IMBALANCE } from '@constants/withdrawTypes'
import { POOL_TOKEN_LOOKUP_BY_NAME } from '@constants/tokens/tokenGroups'
import { useStakedBalance, useTokenBalance } from "@hooks/tokens/useTokenBalances"
import { formatBNToString } from "@bignumber/format"

import Card from "@tw/Card"
import Grid from "@tw/Grid"
import Button from "@tw/Button"
import { useWithdrawStake } from "@hooks/actions/useWithdrawStake"
import { useApproveAndWithdraw } from "@hooks/actions/useApproveAndWithdraw"
import { useTokenInfo } from "@hooks/tokens/useTokenInfo"
import { useSwapPoolMaxWithdraw } from "@hooks/useSwapPoolMaxWithdraw"
import { usePendingTxWrapper } from '@hooks/usePendingTxWrapper'
import { Transition } from "@headlessui/react"
import RecievedTokenSection from "../RecievedTokenSection"

import ButtonLoadingSpinner from '@components/ButtonLoadingSpinner'
import { useSingleCallResult } from "@hooks/multicall"
import { useActiveWeb3React } from "@hooks/useActiveWeb3React"
import { useAvaxClaim } from "@hooks/actions/useAvaxClaim"
import { useAvaxClaimContract } from "@hooks/contracts/useAvaxClaimContract"


export default function MigratePools({poolName}) {
  const lookupObj = POOL_TOKEN_LOOKUP_BY_NAME[poolName]

  const { oldPoolToken } = lookupObj ?? {}
  const oldTokenInfo = useTokenInfo(oldPoolToken)
  const oldTokenBalance = useTokenBalance(oldPoolToken)
  const {amount: stakedOldTokenBalance} = useStakedBalance(oldTokenInfo.poolId)
  const { chainId, account } = useActiveWeb3React()

  const avaxClaimContract = useAvaxClaimContract()
  const avaxNusdClaimResult = useSingleCallResult(
    chainId,
    avaxClaimContract,
    'claimBalances',
    [account],
    { resultOnly: true }
  )

  const nusdClaimAmount = avaxNusdClaimResult?.[0] ?? Zero


  if (lookupObj && ((stakedOldTokenBalance > 0) || (oldTokenBalance > 0) || (nusdClaimAmount > 0))) {
    return (
      <Grid
        cols={{ xs: 1 }}
        gap={2}
      >
        <MigrationCard
          poolName={poolName}
          oldPoolToken={oldPoolToken}
          oldTokenInfo={oldTokenInfo}
          oldTokenBalance={oldTokenBalance}
          stakedOldTokenBalance={stakedOldTokenBalance}
          nusdClaimAmount={nusdClaimAmount}
        />
      </Grid>
    )
  } else {
    return <div></div>
  }

}


function MigrationCard({
  poolName,
  oldTokenBalance,
  stakedOldTokenBalance,
  oldPoolToken,
  oldTokenInfo,
  nusdClaimAmount
}) {
  const {

    onChangeTokenInputValue,
    clearInputs,
    priceImpact,

    poolTokens,
    inputState,
    tokenInputSum,
  } = useSwapPoolMaxWithdraw(oldPoolToken.poolName, oldTokenBalance)




  return (
    <Card
      className={`
        my-8 transform transition-all duration-100 rounded-2xl place-self-center
        min-w-4/5 sm:min-w-3/4 md:min-w-3/5 lg:min-w-1/2
        ${getCardStyleByPool(poolName)}
      `}
      divider={false}
      title="Migrate to new pool"
    >
      <div className='-mb-6'>
        <Grid cols={{ xs: 1, sm: 1 }} gap={4}>
          {(nusdClaimAmount > 0) &&
            <div>
              <NusdClaimButton
                amount={nusdClaimAmount}
              />
            </div>
          }
          {(stakedOldTokenBalance > 0) &&
            <div>
            <UnstakeButton
              poolId={oldTokenInfo.poolId}
              amount={stakedOldTokenBalance}
              oldTokenInfo={oldTokenInfo}
            />
            </div>
          }
          {(oldTokenBalance > 0) &&
            <div>
              <WithdrawFromOldPoolButton
                inputState={inputState}
                oldPoolToken={oldPoolToken}
                lpTokenAmountToSpend={oldTokenBalance}
              />
            </div>
          }
          {/* <div>
            <MigrateToNewPoolButton />
          </div> */}
          <div>
            <Transition
              appear={true}
              unmount={false}
              show={(oldTokenBalance > 0)}
              enter='transition duration-100 ease-out'
              enterFrom='transform-gpu scale-y-0 '
              enterTo='transform-gpu scale-y-100 opacity-100'
              leave='transition duration-75 ease-out '
              leaveFrom='transform-gpu scale-y-100 opacity-100'
              leaveTo='transform-gpu scale-y-0 '
              className='origin-top -mx-6 '
            >
              <WithdrawCardFooter
                poolName={poolName}
                poolTokens={poolTokens}
                inputState={inputState}
                priceImpact={priceImpact}
              />
            </Transition>
          </div>
        </Grid>
      </div>

    </Card>
  )
}

const ACTION_BTN_CLASSNAME = `
  w-full rounded-xl my-2 px-4 py-3 tracking-wide
  text-white disabled:bg-gray-300 transition-all
  `

function NusdClaimButton({ amount }) {

  const [isPending, pendingTxWrapFunc] = usePendingTxWrapper()
  const claimAvaxNusd = useAvaxClaim()
  return (
    <WideBtn
      onClick={async () => {
        const tx = await pendingTxWrapFunc(
          claimAvaxNusd()
        )
      }}
    >
      {
        isPending ?
          <>
            <span className="animate-pulse">Claiming... </span>{" "}
            <ButtonLoadingSpinner className="ml-2" />
          </>
          :
          <span>
            Unstake remaining  {commify(formatBNToString(amount, 18, 0))} NUSD
          </span>
      }
    </WideBtn>
  )
}


function UnstakeButton({ poolId, amount, oldTokenInfo }) {
  const [isPending, pendingTxWrapFunc] = usePendingTxWrapper()
  const withdrawStake = useWithdrawStake()
  return (
    <WideBtn
      onClick={async () => {
        const tx = await pendingTxWrapFunc(
          withdrawStake({ poolId, amount })
        )
      }}
    >
      {
        isPending ?
          <>
            <span className="animate-pulse">Unstaking... </span>{" "}
            <ButtonLoadingSpinner className="ml-2" />
          </>
          :
          <span>
            Unstake {commify(formatBNToString(amount, 18, 0))} {oldTokenInfo.symbol}
          </span>
      }
    </WideBtn>
  )
}


function WithdrawFromOldPoolButton({ oldPoolToken, lpTokenAmountToSpend, inputState }) {
  const [isPending, pendingTxWrapFunc] = usePendingTxWrapper()
  const approveAndWithdraw = useApproveAndWithdraw(oldPoolToken.poolName)
  return (
    <WideBtn
      onClick={async () => {
        const tx = await pendingTxWrapFunc(
          approveAndWithdraw({
            withdrawType: ALL,
            poolTokens: oldPoolToken.poolTokens,
            inputState,
            infiniteApproval: false,
            lpTokenAmountToSpend
          })
        )
       }}
    >
      {
        isPending ?
          <>
            <span className="animate-pulse">Withdrawing... </span>{" "}
            <ButtonLoadingSpinner className="ml-2" />
          </>
          :
          <span>
            Withdraw from legacy pool
          </span>
      }
    </WideBtn>
  )
}



function WideBtn({children, ...props}) {
  return (
    <Button
      // disabled={(fromChainId == toChainId) || toAmount.eq(0) || !isFromBalanceEnough || error}
      fancy={true}
      type='button'
      className={ACTION_BTN_CLASSNAME}
      {...props}
    >
      {children}
    </Button>
  )

}

function WithdrawCardFooter({ priceImpact, poolName, poolTokens, inputState }) {
  return (
    <div className={`py-3.5 pr-6 pl-6 mt-2 rounded-b-2xl dark:bg-coolGray-700 transition-all`}>
      <Grid cols={{ xs: 1 }} >
        <div>
          <RecievedTokenSection
            poolName={poolName}
            poolTokens={poolTokens}
            inputState={inputState}
            label="You will recieve"
          />
        </div>
        <div>
          {/* <PriceImpactDisplay priceImpact={priceImpact.mul(-1)} stacked={true} /> */}
        </div>
      </Grid>
    </div>
  )
}
