import _ from 'lodash'

import { useEffect, useState, useContext } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { Zero, One, AddressZero } from '@ethersproject/constants'

import LPTOKEN_ABI from '@abis/lpToken.json'


import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useGenericPoolApyData } from '@hooks/pools/useGenericPoolApyData'
import {
  useSingleContractMultipleData,
  useSingleContractMultipleMethods,
} from '@hooks/multicall'
import { useEthPrice } from '@hooks/useEthPrice'
import {
  useGenericMasterSwapContract,
  useGenericContract,
  useGenericSwapContract
} from '@hooks/contracts/useContract'


import {
  calcBnSum,
  calcIfZero,
  getTokenBalanceInfo,
  getPoolTokenInfoArr,
  MAX_BN_POW,
} from '@utils/poolDataFuncs'

import { STAKING_MAP_TOKENS } from '@constants/tokens/staking'


export function useGenericPoolData(chainId, poolName) {
  const poolToken = STAKING_MAP_TOKENS[chainId][poolName]

  const { isMeta, poolType, metapoolTokens, poolTokens: regularTokens } = poolToken

  const { account } = useActiveWeb3React()
  const swapContract = useGenericMasterSwapContract(chainId, poolName)

  const poolApyData = useGenericPoolApyData(chainId, poolToken)

  const lpTokenContract = useGenericContract(chainId, poolToken.addresses[chainId], LPTOKEN_ABI)

  // Conditionally Swap Contracts
  let poolTokens
  let underlyingTokens
  if (isMeta) {
    poolTokens = metapoolTokens
    underlyingTokens = regularTokens.slice(1, regularTokens.length)
  } else {
    poolTokens = regularTokens
    underlyingTokens = []
  }

  const ethPrice = useEthPrice()

  // Pool token data
  const tokenBalancesResults = useSingleContractMultipleData(
    chainId,
    swapContract,
    'getTokenBalance',
    poolTokens?.map((token, i) => [i]),
    { resultOnly: true }
  )


  const rawTokenBalances = tokenBalancesResults.map(item => item?.[0] ?? One)//BigNumber.from(1))


  const [swapStorageResult, virtualPriceResult] = useSingleContractMultipleMethods(
    chainId,
    swapContract,
    {
      'swapStorage': [],
      'getVirtualPrice': [],
    },
    { resultOnly: true },
  )

  const [lpTokenBalanceOfResult, totalLpTokenSupplyResult] = useSingleContractMultipleMethods(
    chainId,
    lpTokenContract,
    {
      'balanceOf': [account || AddressZero],
      'totalSupply': [],
    },
    { resultOnly: true },
  )
  // THIS IS THE FRESHLY INTRODUCED CANCER

  const underlyingSwapContract = useGenericSwapContract(chainId, poolTokens[1])

  const underlyingTokenBalancesResults = useSingleContractMultipleData(
    chainId,
    underlyingSwapContract,
    'getTokenBalance',
    underlyingTokens?.map((token, i) => [i]),
    { resultOnly: true }
  )

  const underlyingRawTokenBalances = underlyingTokenBalancesResults.map(item => item?.[0] ?? One)//BigNumber.from(1))

  // bahahahahhahah
  try {
    const tokenBalances = _.zip(poolTokens, rawTokenBalances).map(
      ([token, rawBalance]) =>
        BigNumber.from(10)
          .pow(18 - token.decimals[chainId]) // cast all to 18 decimals
          .mul(rawBalance)
    )
    const underlyingTokenBalances = _.zip(underlyingTokens, underlyingRawTokenBalances).map(
      ([token, rawBalance]) =>
        BigNumber.from(10)
          .pow(18 - token.decimals[chainId]) // cast all to 18 decimals
          .mul(rawBalance)
    )


    const { adminFee, swapFee } = swapStorageResult ?? {}
    const userLpTokenBalance = lpTokenBalanceOfResult?.[0] ?? Zero
    const totalLpTokenBalance = totalLpTokenSupplyResult?.[0] ?? One

    let virtualPrice
    if (totalLpTokenBalance?.isZero()) {
      virtualPrice = MAX_BN_POW
    } else {
      virtualPrice = virtualPriceResult?.[0]
    }


    const { tokenBalancesSum, tokenBalancesUSD } = getTokenBalanceInfo({
      tokenBalances,
      prices: { ethPrice },
      poolType,
    })

    // const { adminFee, swapFee } = await swapStorageRequest
    // (weeksPerYear * KEEPPerWeek * KEEPPrice) / (BTCPrice * BTCInPool)

    // User share data
    const userShare = userLpTokenBalance
      .mul(MAX_BN_POW)
      .div(calcIfZero(totalLpTokenBalance, totalLpTokenBalance))

    const userPoolTokenBalances = tokenBalances.map((balance) =>
      userShare.mul(balance).div(MAX_BN_POW)
    )

    const userPoolTokenBalancesSum = calcBnSum(userPoolTokenBalances)

    const sharedArgs = {

      totalLpTokenBalance,
      tokenBalancesSum,

    }

    const generalPoolTokens = getPoolTokenInfoArr({
      poolTokenBalances: tokenBalances,
      ...sharedArgs,
      poolTokens,
      tokenBalances,
    })

    const underlyingPoolTokens = getPoolTokenInfoArr({
      poolTokenBalances: underlyingTokenBalances,
      tokenBalances: underlyingTokenBalances,
      ...sharedArgs,
      poolTokens: underlyingTokens
    })

    const userPoolTokens = getPoolTokenInfoArr({
      poolTokenBalances: userPoolTokenBalances,
      ...sharedArgs,
      poolTokens,
      tokenBalances,
    })


    const poolDataObj = {
      name: poolName,
      tokens: generalPoolTokens,
      totalLocked: tokenBalancesSum,
      totalLockedUSD: tokenBalancesUSD,
      virtualPrice: virtualPrice,
      adminFee: adminFee,
      swapFee: swapFee,
      volume: 'XXX',                  // TODO
      utilization: 'XXX',                  // TODO
      apy: poolApyData,            //? DIFF
      underlyingTokens: underlyingPoolTokens,
    }

    let userShareData
    if (account) {
      userShareData = {
        name: poolName,
        share: userShare,
        value: userPoolTokenBalancesSum,
        avgBalance: userPoolTokenBalancesSum,
        tokens: userPoolTokens,
        lpTokenBalance: userLpTokenBalance,
        // the code was always doing this, i could not find out why
        lpTokenMinted: userLpTokenBalance,
      }
    } else {
      userShareData = null
    }
    return [poolDataObj, userShareData]
  } catch (error) {
    console.error(error)
    return []
  }

  // return [poolData, userPoolData]
}
