import { useState } from 'react'

import { parseUnits } from '@ethersproject/units'

import { Transition } from '@headlessui/react'


import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { usePendingTxWrapper } from '@hooks/usePendingTxWrapper'
import { useComboSwapContract, useMasterSwapContract } from '@hooks/contracts/useContract'
import { useApproveAndSwap } from '@hooks/actions/useApproveAndSwap'
import { APPROVAL_STATE, useApproveToken } from '@hooks/actions/useApproveToken'

import { sanitizeValue } from '@utils/sanitizeValue'

import { getSwapCardShadowStyleForCoin } from '@styles/coins'
import { COIN_SLIDE_OVER_PROPS } from '@styles/transitions'

import Grid from '@tw/Grid'
import Card from '@tw/Card'

import Button from '@tw/Button'
import ButtonLoadingSpinner from '@components/ButtonLoadingSpinner'
import ExchangeRateInfo from '@components/ExchangeRateInfo'

import CoreSwapContainer from './CoreSwapContainer'
import CoinSlideOver from './CoinSlideOver'
import { WETH } from '@constants/tokens/basic'





export default function SwapCard({
  poolName,
  swapableTokens,
  fromCoin,
  fromValue,
  toCoin,
  toValue,
  swapFromToCoins,
  onSelectFromCoin,
  onSelectToCoin,
  onChangeFromAmount,
  onChangeToAmount,
  error,
  priceImpact,
  exchangeRate,
  fromRef,
  toRef
}) {
  const { chainId } = useActiveWeb3React()
  const approveAndSwap = useApproveAndSwap(poolName)
  const swapContract = useComboSwapContract(poolName)
  const [isPending, pendingTxWrapFunc] = usePendingTxWrapper()
  const [isPendingApproval, pendingApprovalTxWrapFunc] = usePendingTxWrapper()
  const [displayType, setDisplayType] = useState(undefined)
  const [approvalState, approveToken] = useApproveToken(fromCoin, swapContract?.address)

  const toAmount   = parseUnits(sanitizeValue(toValue), toCoin.decimals[chainId])
  const fromAmount = parseUnits(sanitizeValue(fromValue), fromCoin.decimals[chainId])

  const fromArgs = {
    isSwapFrom:       true,
    selected:         fromCoin,
    onChangeSelected: onSelectFromCoin,
    onChangeAmount:   onChangeFromAmount,
    inputValue:       fromValue,
    inputRef:         fromRef,
    tokens:           swapableTokens,
    chainId,
    setDisplayType,
  }

  const toArgs = {
    isSwapFrom:       false,
    selected:         toCoin,
    onChangeSelected: onSelectToCoin,
    onChangeAmount:   onChangeToAmount,
    inputValue:       toValue,
    swapFromToCoins:  swapFromToCoins,
    inputRef:         toRef,
    tokens:           swapableTokens,
    chainId,
    setDisplayType,
  }

  const sharedActionClassName = 'w-full rounded-xl my-2 px-4 py-3 tracking-wide text-white disabled:bg-gray-300'

  const approvalBtn = (
    <Button
      fancy={true}
      type='button'
      className={`${sharedActionClassName} !${getSwapCardShadowStyleForCoin(fromCoin)}`}
      onClick={async () => {
        const tx = await pendingApprovalTxWrapFunc(
          approveToken()
        )
      }}
    >
      {isPendingApproval ?
        <>
          <span className="animate-pulse">
            Approving {fromCoin.symbol} {" "}
          </span>
          {" "}
          <ButtonLoadingSpinner className="ml-2" />
        </>
        :
        <span>Approve {fromCoin.symbol}</span>
      }
    </Button>
  )

  const swapBtn = (
    <Button
      disabled={toAmount.eq(0) || error}
      fancy={true}
      type='button'
      className={sharedActionClassName}
      onClick={async () => {
        const tx = await pendingTxWrapFunc(
          approveAndSwap({
            fromAmount: fromAmount,
            fromCoin,
            toAmount: toAmount,
            toCoin,
          })
        )
        if (tx?.status === 1) {
          onChangeFromAmount("")
        }
      }}
    >
      {isPending ?
        <>
          <span className="animate-pulse">Swapping </span>{" "}
          <ButtonLoadingSpinner className="ml-2" />
        </>
        :
        <span>{error ?? 'Execute Swap'}</span>
      }
    </Button>
  )


  let actionBtn
  if ((approvalState === APPROVAL_STATE.NOT_APPROVED) && (fromCoin.symbol != WETH.symbol)) {
    actionBtn = approvalBtn
  } else {
    actionBtn = swapBtn
  }

  const swapCardMainContent = (
    <>
      <Grid cols={{ xs: 1 }} gap={4} className='place-content-center'>
        <CoreSwapContainer {...fromArgs} />
        <CoreSwapContainer {...toArgs} />
      </Grid>
      <div className="py-2">
        {actionBtn}
      </div>
      <Transition
        appear={true}
        unmount={false}
        show={!fromAmount.eq(0)}
        enter='transition duration-100 ease-out'
        enterFrom='transform-gpu scale-y-0 '
        enterTo='transform-gpu scale-y-100 opacity-100'
        leave='transition duration-75 ease-out '
        leaveFrom='transform-gpu scale-y-100 opacity-100'
        leaveTo='transform-gpu scale-y-0 '
        className='origin-top -mx-6 '
      >
        <ExchangeRateInfo
          fromCoin={fromCoin}
          toCoin={toCoin}
          exchangeRate={exchangeRate}
          priceImpact={priceImpact}
        />
      </Transition>
    </>
  )

  const fromCardContent = <CoinSlideOver key='fromBlock' {...fromArgs} />

  const toCardContent = <CoinSlideOver key='toBlock' {...toArgs} />

  const transitionProps = {
    ...COIN_SLIDE_OVER_PROPS,
    className: `
      origin-bottom absolute
      w-full h-full -ml-6 -mt-12
      bg-white dark:bg-coolGray-800
      z-20 rounded-2xl
      `
  }

  let swapCardShadow
  if (displayType === 'from') {
    swapCardShadow = getSwapCardShadowStyleForCoin(fromCoin)
  } else if (displayType === 'to') {
    swapCardShadow = getSwapCardShadowStyleForCoin(toCoin)
  } else {
    swapCardShadow = 'shadow-indigo-xl hover:shadow-purple-2xl'
  }

  return (
    <Card
      title='Swap'
      divider={false}
      className={`
        transform transition-all duration-100 rounded-2xl
        ${swapCardShadow}
      `}
    >
      <div className='-mb-6'>
        <Transition show={displayType === 'from'} {...transitionProps}>
          {fromCardContent}
        </Transition>
        <Transition show={displayType === 'to'} {...transitionProps}>
          {toCardContent}
        </Transition>
        {swapCardMainContent}
      </div>
    </Card>
  )
}


// FUCK YOU GOOD BYE