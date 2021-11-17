import { Zero } from '@ethersproject/constants'
import { commify } from '@ethersproject/units'

import { formatBNToString } from '@bignumber/format'

import { ChainId } from "@constants/networks"

import { useAirdropContracts } from "@hooks/contracts/useAirdropContracts"
import { useSingleCallResult } from "@hooks/multicall"
import { useActiveWeb3React } from "@hooks/useActiveWeb3React"
import { usePendingTxWrapper } from "@hooks/usePendingTxWrapper"

import { useClaimAirdrop } from '@hooks/actions/useClaimAirdrop'

import ButtonLoadingSpinner from "@components/ButtonLoadingSpinner"
import Button from "@tw/Button"
import Grid from "@tw/Grid"
import Card from "@tw/Card"
import { getNetworkLinkTextColor } from '@utils/styles/networks'



export default function AirdropCard() {
  const { chainId, account } = useActiveWeb3React()

  const {
    nrvAirdropContract, synAirdropContract
  } = useAirdropContracts()
  const nrvClaimResult = useSingleCallResult(
    chainId,
    nrvAirdropContract,
    'claimBalances',
    [account],
    {resultOnly: true}
  )
  const synClaimResult = useSingleCallResult(
    chainId,
    synAirdropContract,
    'claimBalances',
    [account],
    { resultOnly: true }
  )


  const nrvClaimNumber = nrvClaimResult?.[0] ?? Zero
  const synClaimNumber = synClaimResult?.[0] ?? Zero


  let claimSection
  if (chainId == ChainId.BSC) {
    claimSection = (
      <div className="-mb-3">
        <Grid cols={{ xs: 1, sm: 2 }} className="text-coolGray-400">
          <ClaimAmountBlock
            claimResult={synClaimResult}
            labelClassName="text-purple-500"
            label="SYN"
          />
          <ClaimAmountBlock
            claimResult={nrvClaimResult}
            labelClassName="text-indigo-500"
            label="NRV"
          />
        </Grid>
        <div className="space-y-2">
          {(nrvClaimNumber > 0) &&
            <ClaimButton type="NRV" />
          }
          {(synClaimNumber > 0) &&
            <ClaimButton type="SYN" />
          }
        </div>
      </div>
    )
  } else {

    claimSection = (
      <div className="max-w-[500px] text-coolGray-500">
        Switch to
        {' '}
        <span className={getNetworkLinkTextColor(ChainId.BSC)}>
          BSC
        </span>
        {' '}
        to claim
      </div>
    )
  }

  return (
    <Card
      title="Claim Tokens"
      divider={false}
      className={`
        shadow-indigo-xl hover:shadow-purple-2xl
        transform transition-all duration-100 rounded-2xl
        min-w-[380px]
      `}
    >
      {claimSection}
    </Card>
  )
}




function ClaimAmountBlock({ claimResult, labelClassName, label }) {
  const claimableAmount = claimResult?.[0] ?? Zero
  const formattedBalance = commify(formatBNToString(claimableAmount, 18, 0))
  return (
    <div className="w-full text-center py-2">
      <div className="text-xl">{formattedBalance} </div>
      <span className={`font-medium ${labelClassName}`}>{label}</span>
    </div>
  )
}


function ClaimButton({type}) {
  const [isPending, pendingTxWrapFunc] = usePendingTxWrapper()

  const claimAirdrop = useClaimAirdrop()

  return (
    <Button
      fancy={true}
      type='button'
      className={'w-full rounded-xl my-2 px-4 py-3 tracking-wide text-white disabled:bg-gray-300'}
      onClick={async () => {
        const tx = await pendingTxWrapFunc(
          claimAirdrop({type})
        )
      }}
    >
      {isPending ?
        <>
          <span className="animate-pulse">Claiming {type}... </span>{" "}
          <ButtonLoadingSpinner className="ml-2" />
        </>
        :
        <span>{`Claim ${type}`}</span>
      }
    </Button>
  )
}