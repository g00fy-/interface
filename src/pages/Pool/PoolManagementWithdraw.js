import _ from 'lodash'
import { useEffect, useState } from 'react'
import Slider from 'react-input-slider'

import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'

import { Transition } from '@headlessui/react'

import {  getCoinTextColorCombined } from '@styles/coins'

import { ETH, WETH } from '@constants/tokens/basic'
import { ALL, IMBALANCE } from '@constants/withdrawTypes'

import { useDebounce } from '@hooks/useDebounce'
import { useSwapPoolWithdraw } from '@hooks/useSwapPoolWithdraw'
import { useApproveAndWithdraw } from '@hooks/actions/useApproveAndWithdraw'
import { usePoolToken } from '@hooks/pools/usePools'
import { useTokenBalance } from '@hooks/tokens/useTokenBalances'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import Grid from '@tw/Grid'

import TokenInput from '@components/TokenInput'
import RadioButton from '@components/RadioButton'

import RecievedTokenSection from './RecievedTokenSection'
import PriceImpactDisplay from './PriceImpactDisplay'
import { usePendingTxWrapper } from '@hooks/usePendingTxWrapper'
import ButtonLoadingSpinner from '@components/ButtonLoadingSpinner'


// need to add pending for deposit func

export default function PoolManagementWithdraw({ poolName }) {

  const {

    onChangeTokenInputValue,
    clearInputs,
    priceImpact,

    poolTokens,
    inputState,
    setInputState,
    tokenInputSum,

    poolData,
    withdrawType,
    setWithdrawType,
    percentage,
    setPercentage,

    lpTokenValue,
    setLpTokenValue,
    lpTokenAmount
  } = useSwapPoolWithdraw(poolName)

  const debouncedPoolData = useDebounce(poolData, 500)

  const { chainId } = useActiveWeb3React()
  const lpToken = usePoolToken(poolName)
  const lpTokenBalance = useTokenBalance(lpToken)
  const checkPoolNameChange = poolData?.name === debouncedPoolData?.name


  const approveAndWithdraw = useApproveAndWithdraw(poolName)

  const [isPending, pendingTxWrapFunc] = usePendingTxWrapper()

  const [lastChangeField, setLastChangeField] = useState(undefined)

  useEffect(
    () => {
      if ((withdrawType === ALL) && (lastChangeField == "PERCENT")) {
        const numericalOut = formatUnits(
          lpTokenBalance.mul(Number(percentage)).div(100),
          lpToken.decimals[chainId]
        )

        setLpTokenValue(`${numericalOut}`)
      }
    },
    [
      withdrawType,
      percentage,
      checkPoolNameChange,
      lastChangeField // the pool data displayer here is essential to update on initial load
    ]
  )


  useEffect(
    () => {
      if ((withdrawType === ALL) && (lastChangeField == "TOKEN_INPUT")) {
        if (lpTokenBalance > 0) {
          const pn = lpTokenAmount.mul(100).div(lpTokenBalance).toNumber()
          if (pn > 100) {
            setPercentage(100)
          } else {
            setPercentage(pn)
          }

        }


      }
    },
    [lastChangeField, lpTokenAmount, lpTokenValue]
  )


  const percentageStr = percentage//`${Math.round(percentage)}`
  const error = {}

  function onPercentChange(percent) {
    let numPercent = Number(percent)
    if (numPercent > 100) {
      numPercent = 100
    }

    setPercentage(numPercent)


    // if (withdrawType === ALL) {
      const numericalOut = formatUnits(
        lpTokenBalance.mul(Number(numPercent)).div(100),
        lpToken.decimals[chainId]
      )

      setLpTokenValue(`${numericalOut}`)
    // }
    return
  }


  return (
    <div>
      <div className='percentage'>
        <span className="dark:text-coolGray-500 mr-2">Withdraw Percentage %</span>
        <input
          className={`
            px-2 py-1 w-1/5 rounded-md
            focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none
            border border-gray-500
            dark:border-coolGray-700
            dark:bg-coolGray-700
            dark:text-coolGray-300
            focus:dark:border-purple-700

          `}
          placeholder='100'
          onChange={ e => {
            setLastChangeField("PERCENT")
            onPercentChange(e.currentTarget.value)
          }}
          onFocus={ e => e.target.select()}
          value={percentageStr ?? ''}
        />
        <div className='my-2'>
          <Slider
            axis='x'
            xstep={10}
            xmin={0}
            xmax={100}
            x={percentageStr ?? '100'}
            onChange={i => {
              setLastChangeField("PERCENT")
              onPercentChange(i.x)
            }}
            styles={{
              track: {
                backgroundColor: '#E0E7FF',
                width: '95%',
              },
              active: {
                backgroundColor: '#6366F1',
              },
              thumb: {
                backgroundColor: '#312E81',
              },
            }}
          />
        </div>
        {error && (
          <div className='dark:text-red-400 dark:opacity-80'>
            {error.message}
          </div>
        )}
      </div>
      <Grid gap={2} cols={{xs: 2}} className='mt-2'>
        <RadioButton
          checked={withdrawType === ALL}
          onChange={() => {
            clearInputs()
            setWithdrawType(ALL)
          }}
          label='Combo'
          labelClassName={(withdrawType === ALL) && "dark:text-indigo-500"}
        />
        {
          poolTokens.map( t => {
            const checked = withdrawType === t.symbol
            let label
            if (t.symbol == WETH.symbol) {
              label = ETH.name
            } else {
              label = t.name
            }
            return (
              <RadioButton
                radioClassName={getCoinTextColorCombined(t)}
                key={t.symbol}
                checked={checked}
                onChange={() => {
                  setWithdrawType(t.symbol)
                  clearInputs()
                }}
                labelClassName={checked &&  `${getCoinTextColorCombined(t)} opacity-90`}
                label={label}
              />
            )
          })
        }
      </Grid>
      {(withdrawType === ALL) &&
        <TokenInput
          token={lpToken}
          key={lpToken.symbol}
          inputValue={lpTokenValue}
          max={lpTokenBalance}
          onChange={value => {
            setLastChangeField("TOKEN_INPUT")
            setLpTokenValue(value)
          }}
          disabled={false}
        />
      }
      {(withdrawType !== ALL) &&
        poolTokens
          .filter( token => {
            if ([ALL, IMBALANCE].includes(withdrawType)) {
              return true
            } else if (withdrawType == token.symbol) {
              return true
            } else {
              return false
            }

          })
          .map(token =>
            <TokenInput
              token={(token.symbol == WETH.symbol) ? ETH : token}
              max={lpTokenBalance.div(BigNumber.from(10).pow(18 - token.decimals[chainId]))}
              key={token.symbol}
              inputValue={inputState[token.symbol]}
              onChange={value => onChangeTokenInputValue(token.symbol, value)}
              disabled={false}
            />
          )
      }
      <button
        className={`
          w-full mt-4 mb-4 text-md items-center px-6 py-3 border border-transparent rounded-xl
          text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 active:bg-indigo-800
          transition-all duration-75
          focus:outline-none active:outline-none
        `}
        onClick={async () => {
          await pendingTxWrapFunc(
            approveAndWithdraw({
              poolTokens,
              inputState,
              withdrawType,
              infiniteApproval: false,
              lpTokenAmountToSpend:
                (withdrawType == ALL)
                  ? lpTokenAmount
                  : tokenInputSum
              ,
            })
          )
          clearInputs()
        }}
      >
        {isPending ?
          <>
            <span className="animate-pulse">
              Withdrawing {" "}
            </span>
            {" "}
            <ButtonLoadingSpinner className="ml-2" />
          </>
          :
          <span>Withdraw</span>
        }
      </button>
      <Transition
        appear={true}
        unmount={false}
        show={!priceImpact.eq(0)}
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
  )
}


function WithdrawCardFooter({ priceImpact, poolName, poolTokens, inputState}) {
  return (
    <div className={`py-3.5 pr-6 pl-6 mt-2 rounded-b-2xl dark:bg-coolGray-700 transition-all`}>
      <Grid cols={{xs: 2}} >
        <div>
          <RecievedTokenSection
            poolName={poolName}
            poolTokens={poolTokens}
            inputState={inputState}
          />
        </div>
        <div>
          <PriceImpactDisplay priceImpact={priceImpact.mul(-1)} stacked={true} />
        </div>
      </Grid>
    </div>
  )
}
