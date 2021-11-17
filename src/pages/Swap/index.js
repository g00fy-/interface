import _ from 'lodash'

import { useRef, useState, useEffect } from 'react'

import { useHistory, Link } from "react-router-dom"

import { parseUnits, formatUnits } from '@ethersproject/units'
import { Zero, One } from '@ethersproject/constants'

import { checkCleanedValue } from '@utils/checkCleanedValue'
import { sanitizeValue } from '@utils/sanitizeValue'

import { POOLS_PATH, SWAP_PATH } from '@urls'
import { stringifyParams } from '@urls/stringifyParams'

import { METAPOOL_TOKENS_BY_CHAIN, WETH, ETH } from '@constants/tokens/basic'
import { SWAPABLE_TOKENS } from '@constants/tokens/swap'
import { PRIORITY_RANKING } from '@constants/tokens/priorityRanking'

import { useUrlQuery } from '@hooks/useUrlQuery'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import { useMasterSwapContract } from '@hooks/contracts/useContract'

import { usePoolTokenBalances, useTokenBalance } from '@hooks/tokens/useTokenBalances'


import { usePool } from '@hooks/pools/usePools'
import { useDebounce } from '@hooks/useDebounce'



import Grid from '@tw/Grid'

import PageWrapper from '@layouts/PageWrapper'
import RemainingContent from '@layouts/RemainingContent'
import StandardPageContainer from '@layouts/StandardPageContainer'
import Button from '@tw/Button'



import { getInfoMultiCoin } from './useMultiCoinInfo'

import {
  estimateAmountToGive,
  calcAmountToRecieve,
  calculateExchangeRate
} from './funcs'

import SwapCard from './SwapCard'







export default function SwapPage() {
  const urlQuery         = useUrlQuery()
  const history          = useHistory()
  const { chainId }      = useActiveWeb3React()
  const debouncedChainId = useDebounce(chainId, 50)

  const metapoolTokens  = METAPOOL_TOKENS_BY_CHAIN[chainId]
  const priorityRanking = PRIORITY_RANKING[chainId]
  const swapableTokens  = SWAPABLE_TOKENS[chainId]

  const fromQuery = urlQuery.get('inputCurrency')
  const toQuery   = urlQuery.get('outputCurrency')

  const defaultFrom = _.find(swapableTokens, token => token.symbol === fromQuery)
  const defaultTo   = _.find(swapableTokens, token => token.symbol === toQuery)

  let [fromCoin, setFromCoin] = useState(defaultFrom ?? swapableTokens[0])
  let [toCoin, setToCoin]     = useState(defaultTo ?? swapableTokens[1])


  let poolName
  if (chainId === debouncedChainId) {
    poolName = getInfoMultiCoin(fromCoin, toCoin, metapoolTokens, priorityRanking).poolName
  }

  const swapContract  = useMasterSwapContract(poolName)
  const tokenBalances = usePoolTokenBalances(poolName)
  const poolTokens    = usePool(poolName)

  let balanceCoin
  if (fromCoin.symbol == WETH.symbol) {
    balanceCoin = ETH
  } else {
    balanceCoin = fromCoin
  }
  const fromBalance = useTokenBalance(balanceCoin) ?? Zero


  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue]     = useState('')

  const fromRef = useRef(null)
  const toRef   = useRef(null)

  const [priceImpact, setPriceImpact]   = useState(Zero)
  const [exchangeRate, setExchangeRate] = useState(Zero)

  const [error, setError] = useState(null)

  const [lastChangeType, setLastChangeType] = useState("from")

  const swapableTokenSymbols = swapableTokens.map(i => i.symbol)

  function updateUrlParams(params) {
    history.replace(`${SWAP_PATH}?${stringifyParams(params)}`)
  }


  useEffect(
    () => {
      let newFromCoin
      let newToCoin
      if (swapableTokenSymbols.includes(fromCoin.symbol)) {
        newFromCoin = fromCoin
      } else {
        newFromCoin = swapableTokens[0]
      }

      if (swapableTokenSymbols.includes(toCoin.symbol)) {
        newToCoin = toCoin
      } else {
        newToCoin = swapableTokens[1]
      }

      if (newFromCoin.symbol === newToCoin.symbol) {
        newToCoin = swapableTokens.filter(t => t.symbol !== newFromCoin.symbol)[0]
      }

      setFromCoin(newFromCoin)
      setToCoin(newToCoin)
    },
    [chainId]
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

  function onSelectFromCoin(coin, checkPool = true) {
    if (checkPool) {
      const info = getInfoMultiCoin(coin, toCoin, metapoolTokens, priorityRanking)
      // setPoolName(info.poolName)
      onSelectToCoin(info.otherCoin, false)
    }

    if (coin.symbol === toCoin.symbol) {
      swapFromToCoins()
    } else {
      setError(null)
      setFromCoin(coin)
    }
  }

  function resetRates() {
    setPriceImpact(Zero)
    setExchangeRate(Zero)
  }

  function onSelectToCoin(coin, checkPool = true) {
    if (checkPool) {
      const info = getInfoMultiCoin(coin, fromCoin, metapoolTokens, priorityRanking)
      // setPoolName(info.poolName)
      onSelectFromCoin(info.otherCoin, false)
    }

    if (coin.symbol === fromCoin.symbol) {
      swapFromToCoins()
    } else {
      setError(null)
      setToCoin(coin)
      setToValue('')
      if ( lastChangeType === "to" ) {
        setFromValue('')
      }
      resetRates()
    }
  }


  const tokenIndexFrom = poolTokens.findIndex( i => i.symbol === fromCoin.symbol)
  const tokenIndexTo   = poolTokens.findIndex( i => i.symbol === toCoin.symbol)

  const swapInvolvesMetapool = _.intersectionBy(
    [fromCoin, toCoin],
    metapoolTokens,
    t => t.symbol
  ).length > 0


  function triggerRateAndImpact({ amountToGive, amountToReceive }) {
    setExchangeRate(
      calculateExchangeRate(
        amountToGive,
        fromCoin.decimals[chainId],
        amountToReceive,
        toCoin.decimals[chainId]
      )
    )
  }

  function checkIfBalanceSufficient({ amountToGive }) {
    if (amountToGive.gt(fromBalance)) {
      setError('Insufficent Balance')
    } else {
      setError(null)
    }
  }


  async function calculateSwapAmount() {
    if (swapContract == null) return

    let cleanedFromValue = sanitizeValue(fromValue)
    if ( checkCleanedValue(cleanedFromValue) ) {
      setToValue('')
      return
    }

    const amountToGive = parseUnits(cleanedFromValue, fromCoin.decimals[chainId])

    checkIfBalanceSufficient({ amountToGive })


    const amountToReceive = await calcAmountToRecieve({
      swapContract,
      tokenIndexFrom,
      tokenIndexTo,
      swapInvolvesMetapool,
      amountToGive
    })


    if (sanitizeValue(fromRef.current.value) == sanitizeValue(fromValue)) {
      setToValue(formatUnits(amountToReceive, toCoin.decimals[chainId]))
      triggerRateAndImpact({ amountToGive, amountToReceive })
    }
  }

  async function calculateInverseSwapAmount() {
    if (swapContract == null) return
    const cleanedToValue = sanitizeValue(toValue)
    if (checkCleanedValue(cleanedToValue)) {
      setFromValue('')
      return
    }

    const amountToReceive = parseUnits(cleanedToValue, toCoin.decimals[chainId]) ?? One

    const amountToGive = await estimateAmountToGive({
      targetAmountToRecieve: amountToReceive,
      swapContract,
      tokenIndexFrom,
      tokenIndexTo,
      swapInvolvesMetapool,
      fromCoin,
      toCoin,
      chainId
    })

    checkIfBalanceSufficient({ amountToGive })
    if (sanitizeValue(toRef.current.value) == sanitizeValue(toValue)) {
      setFromValue(formatUnits(amountToGive, fromCoin.decimals[chainId]))
      triggerRateAndImpact({ amountToGive, amountToReceive })
    }
  }

  useEffect(
    () => {
      updateUrlParams({
        inputCurrency: fromCoin.symbol,
        outputCurrency: toCoin.symbol
      })
    },
    [fromCoin, toCoin, chainId]
  )

  useEffect(
    () => {
      if ((lastChangeType == "from") && (chainId == debouncedChainId)) {
        calculateSwapAmount()
      }
    },
    [fromCoin, toCoin, fromValue, lastChangeType, chainId, debouncedChainId]
  )

  useEffect(
    () => {
      if ((lastChangeType == "to") && (chainId == debouncedChainId)) {
        calculateInverseSwapAmount()
      }
    },
    [fromCoin, toCoin, toValue, lastChangeType, chainId, debouncedChainId]
  )

  function onChangeFromAmount(value) {
    setLastChangeType("from")
    if (!(value.split(".")[1]?.length > fromCoin.decimals[chainId])) {
      setFromValue(value)
    }
  }

  function onChangeToAmount(value) {
    setLastChangeType("to")
    if (!(value.split(".")[1]?.length > toCoin.decimals[chainId])) {
      setToValue(value)
    }
  }

  return (
    <PageWrapper>
      <StandardPageContainer title='Swap'>
        <main className='relative z-0 overflow-y-auto focus:outline-none h-full'>
          <div className='py-6'>
            <Grid
              cols={{ xs: 1 }}
              gap={6}
              className='py-16 justify-center px-2 sm:px-6 md:px-8'
            >
              <div className='place-self-center pb-3'>
                <SwapCard {...{
                  swapableTokens,
                  fromCoin,
                  fromValue,
                  toCoin,
                  toValue,
                  onSelectFromCoin,
                  onSelectToCoin,
                  swapFromToCoins,
                  poolName,
                  onChangeFromAmount,
                  onChangeToAmount,
                  error,
                  priceImpact,
                  exchangeRate,
                  fromRef,
                  toRef
                }} />
              </div>
              <div>
                <RemainingContent
                  title="About Synapse"
                  subtitle={`Synapse is a trustless cross-chain bridge & stableswap`}
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




/**
 * The entire module above was written by someone who is objectively retarded
 * there are probably 1000 ways to implement this better.
 * This is what happens when you think theyll never know that I’m actually just an ape
 * larping as a raccoon larping as a human larping as an ape
 */
