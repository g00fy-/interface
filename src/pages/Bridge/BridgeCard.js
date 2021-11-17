import { useState } from 'react'

import { Zero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'

import { AdjustmentsIcon } from '@heroicons/react/outline'
import { Transition } from '@headlessui/react'

import { useSettings } from '@hooks/settings/useSettings'
import { useGasDropAmount } from '@hooks/useGasDropAmount'
import { usePendingTxWrapper } from '@hooks/usePendingTxWrapper'
import { useApproveAndBridgeSwap } from '@hooks/actions/useApproveAndBridgeSwap'

import { useBridgeZapContract } from '@hooks/contracts/useBridgeZapContract'
import { APPROVAL_STATE, useApproveToken } from '@hooks/actions/useApproveToken'
import { useTokenBalance } from '@hooks/tokens/useTokenBalances'


import { sanitizeValue } from '@utils/sanitizeValue'
import { validateAndParseAddress } from '@utils/validateAndParseAddress'

import { BRIDGABLE_TOKENS } from '@constants/bridge'
import { getSwapCardShadowStyleForCoin } from '@styles/coins'
import { COIN_SLIDE_OVER_PROPS } from '@styles/transitions'
import { getNetworkShadow } from '@styles/networks'

import Grid from '@tw/Grid'
import Card from '@tw/Card'
import Button from '@tw/Button'

import ButtonLoadingSpinner from '@components/ButtonLoadingSpinner'
import ExchangeRateInfo from '@components/ExchangeRateInfo'

import BridgeInputContainer from './BridgeInputContainer'
import CoinSlideOver from './CoinSlideOver'
import NetworkSlideOver from './NetworkSlideOver'
import SettingsSlideOver from './SettingsSlideOver'
import { DestinationAddressInput } from './DestinationAddressInput'



const ACTION_BTN_CLASSNAME = `
  w-full rounded-xl my-2 px-4 py-3 tracking-wide
  text-white disabled:bg-gray-300 transition-all
  `

export default function BridgeCard({
  fromChainId,
  toChainId,
  fromCoin,
  fromValue,
  toCoin,
  toValue,
  onSelectFromChain,
  onSelectToChain,
  swapFromToChains,
  onSelectFromCoin,
  onSelectToCoin,
  onChangeFromAmount,
  onChangeToAmount,
  error,
  priceImpact,
  exchangeRate,
  feeAmount,
  fromRef,
  toRef
}) {


  const fromChainTokens = BRIDGABLE_TOKENS[fromChainId]
  const toChainTokens = BRIDGABLE_TOKENS[toChainId]

  const gasDropAmount =  useGasDropAmount(toChainId)

  const [isPending, pendingTxWrapFunc] = usePendingTxWrapper()
  const [isPendingApproval, pendingApprovalTxWrapFunc] = usePendingTxWrapper()
  const [displayType, setDisplayType] = useState(undefined)
  const [settings, setSettings] = useSettings()

  const [destinationAddress, setDestinationAddress] = useState()

  let fromAmount
  try {
    fromAmount = parseUnits(sanitizeValue(fromValue), fromCoin.decimals[fromChainId])
  } catch (e) {
    fromAmount = Zero
  }
  let toAmount
  try {
    toAmount = parseUnits(sanitizeValue(toValue), toCoin.decimals[toChainId])
  } catch (e) {
    toAmount = Zero
  }

  const bridgeZapContract = useBridgeZapContract()

  const approveAndBridgeSwap = useApproveAndBridgeSwap({ amount: fromAmount, token: fromCoin})

  const [ approvalState, approveToken ] = useApproveToken(fromCoin, bridgeZapContract.address)

  const fromTokenBalance = useTokenBalance(fromCoin)

  const fromArgs = {
    isSwapFrom:       true,
    selected:         fromCoin,
    onChangeSelected: onSelectFromCoin,
    onChangeAmount:   onChangeFromAmount,
    inputValue:       fromValue,
    inputRef:         fromRef,
    tokens:           fromChainTokens,
    chainId:          fromChainId,
    setDisplayType,
  }

  const toArgs = {
    isSwapFrom:       false,
    selected:         toCoin,
    onChangeSelected: onSelectToCoin,
    onChangeAmount:   onChangeToAmount,
    inputValue:       toValue,
    inputRef:         toRef,
    tokens:           toChainTokens,
    chainId:          toChainId,
    swapFromToChains,
    setDisplayType,
  }

  const fromChainArgs = {
    isSwapFrom:      true,
    selectedChainId: fromChainId,
    onChangeChain:   onSelectFromChain,
    setDisplayType,
  }

  const toChainArgs = {
    isSwapFrom:      false,
    selectedChainId: toChainId,
    onChangeChain:   onSelectToChain,
    setDisplayType,
  }

  const settingsArgs = {
    settings,
    setSettings,
    setDisplayType
  }


  const approvalBtn = (
    <Button
      fancy={true}
      type='button'
      className={`${ACTION_BTN_CLASSNAME} !${getSwapCardShadowStyleForCoin(fromCoin)}`}
      onClick={async () => {
        await pendingApprovalTxWrapFunc(
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

  const isFromBalanceEnough = fromTokenBalance.gte(fromAmount) // && !fromAmount.eq(0)

  let destAddrNotValid
  let btnLabel
  if (isPending) {
    btnLabel =
      <>
        <span className="animate-pulse">
          Bridging{" "}
        </span>
        {" "}
        <ButtonLoadingSpinner className="ml-2" />
      </>
  } else {
    if (error) {
      btnLabel = error
    } else if (!isFromBalanceEnough) {
      btnLabel = `Insufficient ${fromCoin.symbol} Balance`
    } else if (exchangeRate.eq(0) && !fromAmount.eq(0)) {
      btnLabel = `Amount must be greater than fee`
    } else if (fromChainId == toChainId) {
      btnLabel = 'Why are you bridging to the same network?'
    } else if (destinationAddress && !validateAndParseAddress(destinationAddress)) {
      destAddrNotValid = true
      btnLabel = "Invalid Destination Address"
    } else {
      btnLabel = 'Bridge Token'
    }
  }

  const swapBtn = (
    <Button
      disabled={(fromChainId == toChainId) || toAmount.eq(0) || !isFromBalanceEnough || error || destAddrNotValid}
      fancy={true}
      type='button'
      className={ACTION_BTN_CLASSNAME}
      onClick={async () => {
        const tx = await pendingTxWrapFunc(
          approveAndBridgeSwap({
            destinationAddress,
            fromChainId,
            toChainId,
            fromAmount,
            fromCoin,
            toAmount,
            toCoin,
          })
        )
        if (tx?.status === 1) {
          onChangeFromAmount("")
        }
      }}
    >
      {btnLabel}
    </Button>
  )


  let actionBtn
  if (approvalState === APPROVAL_STATE.NOT_APPROVED) {
    actionBtn = approvalBtn
  } else {
    actionBtn = swapBtn
  }

  // let actionBtn = <PausedButton/> // PAUSE OVERRIDE

  const bridgeCardMainContent = (
    <>
      <Grid cols={{ xs: 1 }} gap={4} className='place-content-center'>
        <BridgeInputContainer {...fromArgs} />
        <BridgeInputContainer {...toArgs} />
        <Transition
          appear={false}
          unmount={false}
          show={settings.expertMode}
          enter='transition duration-100 ease-out'
          enterFrom='transform-gpu scale-y-0 '
          enterTo='transform-gpu scale-y-100 opacity-100'
          leave='transition duration-75 ease-out '
          leaveFrom='transform-gpu scale-y-100 opacity-100'
          leaveTo='transform-gpu scale-y-0 '
          className='origin-top -mx-6 '
        >
          <div>
            <DestinationAddressInput
              destinationAddress={destinationAddress}
              setDestinationAddress={setDestinationAddress}
            />
          </div>
        </Transition>
      </Grid>
      <div className="py-2">
        { actionBtn }
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
          feeAmount={feeAmount}
          gasDropAmount={gasDropAmount}
          fromChainId={fromChainId}
          toChainId={toChainId}
        />
      </Transition>
    </>
  )

  const fromCardContent = <CoinSlideOver key='fromBlock' {...fromArgs} />
  const toCardContent   = <CoinSlideOver key='toBlock' {...toArgs} />

  const fromChainCardContent = <NetworkSlideOver key='fromChainBlock' {...fromChainArgs} />
  const toChainCardContent   = <NetworkSlideOver key='toChainBlock' {...toChainArgs} />

  const settingsCardContent = <SettingsSlideOver key='settings' {...settingsArgs} />

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
  } else if (displayType === 'fromChain') {
    swapCardShadow = getNetworkShadow(fromChainId)
  } else if (displayType === 'toChain') {
    swapCardShadow = getNetworkShadow(toChainId)
  } else {
    swapCardShadow = `shadow-indigo-xl hover:shadow-purple-2xl ${getNetworkShadow(fromChainId)}`
  }


  return (
    <Card
      title={
        <>
          Bridge
          <AdvancedOptionsButton
            className="float-right"
            onClick={() => {
              setDisplayType("settings")
            }}
          />
        </>
      }
      titleClassName='pl-2 sm:pl-0'
      divider={false}
      className={`
        !px-4 sm:!px-6
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
        <Transition show={displayType === 'fromChain'} {...transitionProps}>
          {fromChainCardContent}
        </Transition>
        <Transition show={displayType === 'toChain'} {...transitionProps}>
          {toChainCardContent}
        </Transition>
        <Transition show={displayType === 'settings'} {...transitionProps}>
          {settingsCardContent}
        </Transition>
        {bridgeCardMainContent}
        <Transition
          show={['fromChain', 'toChain'].includes(displayType) && feeAmount.eq(Zero)}
          {...COIN_SLIDE_OVER_PROPS}
          className={`
            origin-bottom
            w-full -ml-6
            bg-white dark:bg-coolGray-800
            rounded-b-2xl
          `}
        >
          <div>
            <div className="w-full h-16">
            </div>
            <div className="w-full h-10">
            </div>
          </div>
        </Transition>
      </div>
    </Card>
  )
}


// TODO: Fix the transition post ftm addition
// TODO: Need to coordnate transition from approval => other action
// TODO: find solution to mental retardation

function PausedButton() {
  return (
    <Button
      disabled={true}
      fancy={true}
      type='button'
      className={ACTION_BTN_CLASSNAME}
    >
      Bridge is currently paused
    </Button>
  )
}

function AdvancedOptionsButton({ className, onClick }) {
  return (
    <div
      className={`
        group rounded-lg hover:bg-coolGray-900 ${className} p-1`
      }
      onClick={onClick}
    >
      <AdjustmentsIcon className="w-6 h-6 text-coolGray-500 group-hover:text-coolGray-300"/>
    </div>
  )
}