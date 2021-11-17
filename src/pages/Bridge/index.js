import _ from 'lodash'

import { useRef, useState, useEffect } from 'react'

import { useHistory, Link } from "react-router-dom"

import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits, formatUnits } from '@ethersproject/units'
import { Zero, One } from '@ethersproject/constants'

import { NUSD, SYN } from '@constants/tokens/basic'
import { ChainId, CHAIN_INFO_MAP } from '@constants/networks'
import { BRIDGABLE_TOKENS } from '@constants/bridge'
import {
  BRIDGE_SWAPABLE_TYPES_BY_CHAIN,
  BRIDGE_SWAPABLE_TOKENS_BY_CHAIN,
  BRIDGE_SWAPABLE_TOKENS_BY_TYPE,
  BRIDGE_CHAINS_BY_TYPE
} from '@constants/tokens/tokenGroups'
import { POOLS_PATH, BRIDGE_PATH } from '@urls'
import { stringifyParams } from '@urls/stringifyParams'

import { checkCleanedValue } from '@utils/checkCleanedValue'
import { sanitizeValue } from '@utils/sanitizeValue'
import { calculateExchangeRate } from '@utils/calculateExchangeRate'

import { usePrevious } from '@hooks/usePrevious'
import { useUrlQuery } from '@hooks/useUrlQuery'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useChainSwitcher } from '@hooks/useChainSwitcher'
import { useCalculateBridgeRate } from '@hooks/useCalculateBridgeRate'

import Grid from '@tw/Grid'
import Button from '@tw/Button'

import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'
import RemainingContent from '@layouts/RemainingContent'

import BridgeCard from './BridgeCard'
import BridgeWatcher from './BridgeWatcher'




export default function BridgePage() {
  const urlQuery    = useUrlQuery()
  const history     = useHistory()

  const toChainQuery = urlQuery.get('outputChain')
  const fromQuery    = urlQuery.get('inputCurrency')
  const toQuery      = urlQuery.get('outputCurrency')

  const { chainId: fromChainId } = useActiveWeb3React()
  const previousFromChainId = usePrevious(fromChainId)
  let defaultToChain
  if (toChainQuery?.length > 0 && (parseInt(toChainQuery) != fromChainId)) {
    // This specific if block is suspect. if state gets weird, drop url state
    defaultToChain = parseInt(toChainQuery)
  } else {
    defaultToChain = _.keys(CHAIN_INFO_MAP)
      .map(i => parseInt(i))
      .filter(i => i != fromChainId)[0]
  }



  const [toChainId, setToChainId] = useState(defaultToChain) //(fromChainId !== 1) ? 1 : 56
  const triggerChainSwitch = useChainSwitcher()
  const calculateBridgeRate = useCalculateBridgeRate({ fromChainId, toChainId })

  const fromChainTokens = BRIDGABLE_TOKENS[fromChainId]  // BRIDGE_SWAPABLE_TOKENS_BY_CHAIN[fromChainId]
  const toChainTokens   = BRIDGABLE_TOKENS[toChainId]    // BRIDGE_SWAPABLE_TOKENS_BY_CHAIN[toChainId]

  const defaultFrom = _.find(fromChainTokens, token => token.symbol === fromQuery)
  const defaultTo   = _.find(toChainTokens, token => token.symbol === toQuery)

  const [fromCoin, setFromCoin] = useState(defaultFrom ?? fromChainTokens[0])
  const [toCoin, setToCoin]     = useState(defaultTo ?? toChainTokens[0])

  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue]     = useState('')


  const fromRef = useRef(null)
  const toRef   = useRef(null)

  const [priceImpact, setPriceImpact]   = useState(Zero)
  const [exchangeRate, setExchangeRate] = useState(Zero)
  const [feeAmount, setFeeAmount] = useState(Zero)

  const [error, setError] = useState(null)

  const [lastChangeType, setLastChangeType] = useState("from")

  let defaultSwapableType = fromCoin.swapableType
  const [swapableType, setSwapableType] = useState(defaultSwapableType ?? "USD")

  const fromTokenSymbols = fromChainTokens.map(i => i.symbol)
  const toTokenSymbols = toChainTokens.map(i => i.symbol)


  function updateUrlParams(params) {
    history.replace(`${BRIDGE_PATH}?${stringifyParams(params)}`)
  }

  useEffect(
    () => {
      if (fromChainId == toChainId) {
        if (previousFromChainId) {
          setToChainId(previousFromChainId)
        }
      }
    },
    [
      fromChainId,
      toChainId
    ]
  )

  useEffect(
    () => {
      if (toCoin.swapableType != fromCoin.swapableType) {
        if (lastChangeType === "from") {
          if (BRIDGE_SWAPABLE_TOKENS_BY_TYPE[toChainId][fromCoin.swapableType]) {
            setToCoin(BRIDGE_SWAPABLE_TOKENS_BY_TYPE[toChainId][fromCoin.swapableType][0])
          }
        }
        if (lastChangeType === "to") {
          if (BRIDGE_SWAPABLE_TOKENS_BY_TYPE[fromChainId][toCoin.swapableType]) {
            setFromCoin(BRIDGE_SWAPABLE_TOKENS_BY_TYPE[fromChainId][toCoin.swapableType][0])
          }
        }
      }
    },
    [swapableType]
  )

  useEffect(
    () => {
      let newFromCoin
      let newToCoin
      if (fromTokenSymbols.includes(fromCoin.symbol)) {
        newFromCoin = fromCoin
      } else {
        newFromCoin = fromChainTokens[0]
      }

      if (toTokenSymbols.includes(toCoin.symbol)) {
        newToCoin = toCoin
      } else {
        newToCoin = toChainTokens[0]
      }

      if (newToCoin.swapableType != newFromCoin.swapableType) {
        if (lastChangeType === "from") {
          setSwapableType(newFromCoin.swapableType)
        }
        if (lastChangeType === "to") {
          setSwapableType(newToCoin.swapableType)
        }
      }

      setFromCoin(newFromCoin)
      setToCoin(newToCoin)
    },
    [fromChainId, toChainId]
  )

  function swapFromToCoins() {
    setFromCoin(toCoin)
    setToCoin(fromCoin)
    if (lastChangeType === "from") {
      setToValue('')
    } else {
      setFromValue('')
    }
    setPriceImpact(Zero)
    setExchangeRate(Zero)
  }

  function swapFromToChains() {

    triggerChainSwitch(toChainId)
      .then(() => setToChainId(fromChainId))
      .catch(error => console.error(error))

    if (lastChangeType === "from") {
      setToValue('')
    } else {
      setFromValue('')
    }
    setPriceImpact(Zero)
    setExchangeRate(Zero)
  }

  function onSelectFromCoin(coin) {
    setLastChangeType("from")
    setError(null)
    setFromCoin(coin)
  }

  function resetRates() {
    setPriceImpact(Zero)
    setExchangeRate(Zero)
  }

  function onSelectToCoin(coin) {
    setLastChangeType("to")
    setError(null)
    setToCoin(coin)
    setToValue('')
    if ( lastChangeType === "to" ) {
      setFromValue('')
    }
    resetRates()
  }

  async function onSelectFromChain(itemChainId) {
    setLastChangeType("from")
    triggerChainSwitch(itemChainId)
      .then(() => {
        if (itemChainId == toChainId) {
          setToChainId(fromChainId)
        }
      })
      .catch(e => {
        console.error(e)
      })
  }

  async function onSelectToChain(itemChainId) {
    setLastChangeType("to")
    if (itemChainId == fromChainId) {
      triggerChainSwitch(toChainId)
        .then(() => {
          setToChainId(itemChainId)
        })
    } else {
      setToChainId(itemChainId)
    }
  }


  useEffect(
    () => {
      updateUrlParams({
        inputCurrency: fromCoin.symbol,
        outputCurrency: toCoin.symbol,
        outputChain: toChainId
      })
    },
    [fromCoin, toCoin, fromChainId, toChainId]
  )

  function onChangeFromAmount(value) {
    setLastChangeType("from")
    if (!(value.split(".")[1]?.length > fromCoin.decimals[fromChainId])) {
      setFromValue(value)
    }
  }

  function onChangeToAmount(value) {
    setLastChangeType("to")
    if (!(value.split(".")[1]?.length > toCoin.decimals[toChainId])) {
      setToValue(value)
    }
  }

  function triggerRateAndImpact({ amountToGive, amountToReceive, bridgeFee }) {

    setFeeAmount(bridgeFee)
    setExchangeRate(
      calculateExchangeRate(
        amountToGive.sub(
          feeAmount
            .div(BigNumber.from(10).pow(18 - fromCoin.decimals[fromChainId] )
          )
        ),
        fromCoin.decimals[fromChainId],
        amountToReceive,
        toCoin.decimals[toChainId]
      )
    )
  }

  useEffect(
    () => {
      const fromSwapableTypes = BRIDGE_CHAINS_BY_TYPE[fromCoin.swapableType]
      const toSwapableTypes = BRIDGE_CHAINS_BY_TYPE[toCoin.swapableType]
      const validSwapableTypes = _.intersection(fromSwapableTypes, toSwapableTypes)
      if (lastChangeType === "from") {
        if (fromCoin.symbol === SYN.symbol) {
          setToCoin(SYN)
        }

        let newToChainId = BRIDGE_CHAINS_BY_TYPE[fromCoin.swapableType][0]
        if (newToChainId == fromChainId) {
          newToChainId = BRIDGE_CHAINS_BY_TYPE[fromCoin.swapableType][1]
        }

        if (validSwapableTypes.length == 0) {
          onSelectToChain(newToChainId)
        } else {
          if (!validSwapableTypes.includes(toCoin.swapableType)) {
            if (!BRIDGE_SWAPABLE_TYPES_BY_CHAIN[toChainId].includes(fromCoin.swapableType)) {
              onSelectToChain(newToChainId)
            }
            if (fromCoin.swapableType != toCoin.swapableType) {
              setToCoin(BRIDGE_SWAPABLE_TOKENS_BY_TYPE[newToChainId][fromCoin.swapableType][0])
            }

          }
        }
      }

      if (lastChangeType === "to") {
        if (toCoin.symbol === SYN.symbol) {
          setFromCoin(SYN)
        }

        let newFromChainId = BRIDGE_CHAINS_BY_TYPE[toCoin.swapableType][0]
        if (newFromChainId == toChainId) {
          newFromChainId = BRIDGE_CHAINS_BY_TYPE[toCoin.swapableType][1]
        }
        if (validSwapableTypes.length == 0) {
          onSelectFromChain(newFromChainId)
        } else {
          if (!validSwapableTypes.includes(fromCoin.swapableType)) {
            if (!BRIDGE_SWAPABLE_TYPES_BY_CHAIN[fromChainId].includes(toCoin.swapableType)) {
              onSelectFromChain(newFromChainId)
            }
            if (toCoin.swapableType != fromCoin.swapableType) {
              setFromCoin(BRIDGE_SWAPABLE_TOKENS_BY_TYPE[newFromChainId][toCoin.swapableType][0])
            }

          }
        }
      }
    },
    [
      fromCoin,
      toCoin,
      toChainId,
      fromChainId
    ]
  )


  function calculateBridgeAmount() {
    let cleanedFromValue = sanitizeValue(fromValue)
    if (checkCleanedValue(cleanedFromValue)) {
      setToValue('')
      return
    }

    const amountToGive = parseUnits(cleanedFromValue, fromCoin.decimals[fromChainId])

    // const { amountToReceive, bridgeFee } = await calculateBridgeRate({ fromCoin, toCoin, amountToGive })

    // if (sanitizeValue(fromRef.current?.value) == sanitizeValue(fromValue)) {

    //   setToValue(formatUnits(amountToReceive, toCoin.decimals[toChainId]))
    //   triggerRateAndImpact({ amountToGive, amountToReceive, bridgeFee })
    // }

    calculateBridgeRate({ fromCoin, toCoin, amountToGive })
      .then( ({ amountToReceive, bridgeFee }) => {
        if (sanitizeValue(fromRef.current?.value) == sanitizeValue(fromValue)) {

          setToValue(formatUnits(amountToReceive, toCoin.decimals[toChainId]))
          triggerRateAndImpact({ amountToGive, amountToReceive, bridgeFee })
        }
      })
  }



  useEffect(
    () => {
      if (fromCoin && toCoin) {
        calculateBridgeAmount()
      }
    },
    [fromCoin.symbol, toCoin.symbol, fromValue, lastChangeType, fromChainId, toChainId, feeAmount]
  )

  return (
    <PageWrapper>
      <StandardPageContainer title='Synapse Bridge'>
        <main className='relative z-0 overflow-y-auto focus:outline-none h-full'>
          <div className='py-6'>
            <Grid
              cols={{ xs: 1 }}
              gap={6}
              className='py-16 justify-center px-2 sm:px-6 md:px-8'
            >
              <div className='place-self-center pb-3'>
                <BridgeCard {...{
                  fromChainTokens,
                  toChainTokens,
                  fromChainId,
                  toChainId,
                  fromCoin,
                  fromValue,
                  toCoin,
                  toValue,
                  onSelectFromCoin,
                  onSelectToCoin,
                  onSelectFromChain,
                  onSelectToChain,
                  swapFromToCoins,
                  swapFromToChains,
                  onChangeFromAmount,
                  onChangeToAmount,
                  error,
                  priceImpact,
                  exchangeRate,
                  feeAmount,
                  fromRef,
                  toRef
                }}/>
              </div>
              <div>
                <BridgeWatcher/>
              </div>
              <div>
                <RemainingContent
                  title="About Synapse"
                  subtitle={`Synapse is a trustless cross-chain AMM & bridge`}
                  description={"Bridge assets across chains, swap assets, earn yield & more"}
                >
                  <Link exact to={POOLS_PATH}>
                    <Button
                      fancy={true}
                      className={`
                        mt-6 px-4 py-3 text-base rounded-xl tracking-wide
                        shadow-indigo-xl hover:shadow-purple-2xl
                        text-white focus:outline-none
                      `}
                    >
                      Explore Pools
                    </Button>
                  </Link>
                </RemainingContent>
              </div>
            </Grid>
          </div>
        </main>
      </StandardPageContainer>
    </PageWrapper>
  )
}
