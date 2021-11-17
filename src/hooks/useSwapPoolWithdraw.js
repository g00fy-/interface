import _ from 'lodash'
import { useState, useEffect, useMemo } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import { formatUnits, parseUnits } from '@ethersproject/units'

import { sanitizeValue } from '@utils/sanitizeValue'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import { usePoolData } from '@hooks/pools/usePoolData'
import { usePoolTokenInfo } from '@hooks/pools/usePools'

import { useSwapDepositContract } from '@hooks/contracts/useContract'


import { calculatePriceImpact } from '@utils/priceImpact'

import { ALL, IMBALANCE } from '@constants/withdrawTypes'


export function useSwapPoolWithdraw(poolName) {
  const { account, chainId } = useActiveWeb3React()
  const { poolTokens, isMeta, decimals } = usePoolTokenInfo(poolName)
  const [lpTokenValue, setLpTokenValue] = useState("")
  const lpTokenAmount = useMemo(
    () => parseUnits(sanitizeValue(lpTokenValue), decimals),
    [lpTokenValue]
  )
  let defaultInputState = {}
  for (const token of poolTokens) {
    defaultInputState[token.symbol] = ""
  }
  const [inputState, setInputState] = useState(defaultInputState)
  let defaultWithdrawAmountState = {}
  for (const token of poolTokens) {
    defaultWithdrawAmountState[token.symbol] = Zero
  }
  const [withdrawAmount, setWithdrawAmount] = useState(Zero)

  const [priceImpact, setPriceImpact] = useState(Zero)


  const swapContract = useSwapDepositContract(poolName)
  const [withdrawType, setWithdrawType] = useState(ALL)
  const [percentage, setPercentage] = useState(100)
  const [poolData, userShareData] = usePoolData(poolName, isMeta)

  let sanitizedInputState = {}
  for (const [symbol, inputStr] of _.toPairs(inputState)) {
    sanitizedInputState[symbol] = sanitizeValue(inputStr)
  }

  let numericalInputState = {}
  for (const [symbol, inputStr] of _.toPairs(inputState)) {
    numericalInputState[symbol] = Number(sanitizeValue(inputStr))
  }

  let tokenInputSum = Zero
  for (const poolToken of poolTokens) {
    tokenInputSum = tokenInputSum.add(parseUnits(sanitizedInputState[poolToken.symbol]))
  }

  /**
   * evaluate if a new deposit will exceed the pool's per-user limit
   * */
  async function calculateMaxWithdraw() {
    if (swapContract == null || poolData == null || account == null) {
      return
    }

    let withdrawLpTokenAmount
    if (poolData.totalLocked.gt(0) && tokenInputSum.gt(0)) {
      withdrawLpTokenAmount = await swapContract.calculateTokenAmount(
        // account,
        poolTokens.map(i =>
          parseUnits(sanitizedInputState[i.symbol], i.decimals[chainId])
        ),
        false // deposit boolean
      )
    } else {
      // when pool is empty, estimate the lptokens by just summing the input instead of calling contract
      withdrawLpTokenAmount = tokenInputSum
    }
    const calcedPriceImpact = calculatePriceImpact(
      tokenInputSum,
      withdrawLpTokenAmount,
      poolData.virtualPrice
    )

    setWithdrawAmount(withdrawLpTokenAmount)
    setPriceImpact(calcedPriceImpact)
  }

  useEffect(
    () => {
      // if (poolData.virtualPrice) {
      calculateMaxWithdraw()
      // }
    },
    [inputState, swapContract, account] // poolData
  )


  // parseUnits(sanitizedInputState[i.symbol], i.decimals[chainId])
  /**
   * evaluate if a new withdraw will exceed the pool's per-user limit
   */
  async function calculateWithdrawBonus() {
    if (swapContract == null || poolData == null || account == null) {
      return
    }

    if (withdrawType == ALL) {
       const results = await swapContract.calculateRemoveLiquidity(lpTokenAmount)
       const newInputState = {}
       for (const [t, amt] of _.zip(poolTokens, results) ) {
         newInputState[t.symbol] = formatUnits(amt, t.decimals[chainId])
       }
       setInputState(newInputState)
    } else if (withdrawType == IMBALANCE){

    } else {
      // console.log({withdrawType})
      // const newInputState = {}
      // const targetIndex = _.indexOf(poolTokens.map(t => t.symbol), withdrawType)
      // console.log(tokenInputSum)
      // for (const t of poolTokens ) {

      //   if (t.symbol == withdrawType) {
      //     const tokenAmount = await swapContract.calculateRemoveLiquidityOneToken(
      //       formatUnits(tokenInputSum, t.decimals[chainId]),
      //       targetIndex

      //     )
      //     newInputState[t.symbol] = formatUnits(tokenAmount, t.decimals[chainId])
      //   } else {
      //     newInputState[t.symbol] = ""
      //   }

      // }

    }

    // let withdrawLPTokenAmount
    // if (poolData.totalLocked.gt(0) && tokenInputSum.gt(0)) {
    //   withdrawLPTokenAmount = await swapContract.calculateTokenAmount(
    //     // account,
    //     poolTokens.map(i => parseUnits(inputState[i.symbol], i.decimals[chainId]) ),
    //     false
    //   )
    // } else {
    //   // when pool is empty, estimate the lptokens by just summing the input instead of calling contract
    //   withdrawLPTokenAmount = tokenInputSum
    // }
  }

  useEffect(
    () => {
      calculateWithdrawBonus()
    },
    [lpTokenAmount, swapContract, account]
    //, withdrawType
  )






  function onChangeTokenInputValue(symbol, value) {
    setInputState({ ...inputState, [symbol]: value })
  }


  function clearInputs() {
    setInputState(defaultInputState)
  }



  return {
    withdrawType,
    setWithdrawType,
    setInputState,
    onChangeTokenInputValue,
    clearInputs,
    priceImpact,

    poolTokens,
    inputState,
    tokenInputSum,

    poolData,
    percentage,
    setPercentage,

    lpTokenValue,
    setLpTokenValue,
    lpTokenAmount
  }
}





// {
//   cardNav === 'addLiquidity' && (
//     <PoolManagementDeposit

//     />
//   )
// }
// {
//   cardNav === 'removeLiquidity' && (
//     <PoolManagementWithdraw
//       onFormChange={updateWithdrawFormState}
//       tokens={withdrawTokens}
//       formStateData={withdrawFormState}
//       onConfirmTransaction={onConfirmWithdrawTransaction}
//       priceImpact={estWithdrawBonus}
//       poolData={poolData}
//     />
//   )
// }

