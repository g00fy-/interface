import { BigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'

import { ChainId } from '@constants/networks'
import { SYN, NUSD, NETH, ETH, WETH, SYN_FRAX, FRAX } from '@constants/tokens/basic'
import { BRIDGE_SWAPABLE_TYPE_POOLS_BY_CHAIN, MINT_BURN_TOKENS } from '@constants/tokens/tokenGroups'

import { MAX_GAS_THRESHOLD } from '@utils/gas'

import { useBridgeZapContract, useGenericBridgeZapContract } from '@hooks/contracts/useBridgeZapContract'
import { useBridgeConfigContract } from '@hooks/contracts/useBridgeConfigContract'




export function useCalculateBridgeRate({fromChainId, toChainId}) {
  const bridgeConfigContract = useBridgeConfigContract()
  const fromChainZapContract = useBridgeZapContract()
  const toChainZapContract = useGenericBridgeZapContract(toChainId)


  return async function calculateBridgeRate({
    fromCoin,
    toCoin,
    amountToGive,
  }) {
    if (!fromChainZapContract) throw new Error('Bridge Zap contract is not loaded')
    if (!toChainZapContract) throw new Error('Bridge Zap contract is not loaded')

    if (fromCoin.symbol == ETH.symbol) {
      fromCoin = WETH
    }

    if (toCoin.symbol == ETH.symbol) {
      toCoin = WETH
    }

    const fromChainTokens = BRIDGE_SWAPABLE_TYPE_POOLS_BY_CHAIN[fromChainId][fromCoin.swapableType].poolTokens
    const toChainTokens   = BRIDGE_SWAPABLE_TYPE_POOLS_BY_CHAIN[toChainId][toCoin.swapableType].poolTokens

    const tokenIndexFrom = fromChainTokens.findIndex(i => i.symbol === fromCoin.symbol)
    const tokenIndexTo   = toChainTokens.findIndex(i => i.symbol === toCoin.symbol)
    // console.log({ fromChainTokens, toChainTokens, tokenIndexFrom, tokenIndexTo })
    let intermedieteToken
    let bridgeConfigIntermedieteToken
    if (fromCoin.swapableType === "SYN") {
      intermedieteToken = SYN
    } else if (["HIGHSTREET", "DOG", "JUMP"].includes(fromCoin.swapableType)) {
      intermedieteToken = fromCoin
    } else if (fromCoin.swapableType == "FRAX") {
      if (toChainId == ChainId.ETH) {
        bridgeConfigIntermedieteToken = FRAX
      } else {
        bridgeConfigIntermedieteToken = SYN_FRAX
      }
    } else if (fromCoin.swapableType === "ETH") {
      intermedieteToken = NETH
      if (toChainId == ChainId.ETH) {
        bridgeConfigIntermedieteToken = WETH
      } else {
        bridgeConfigIntermedieteToken = NETH
      }

    } else {
      intermedieteToken = NUSD
    }
    bridgeConfigIntermedieteToken = bridgeConfigIntermedieteToken ?? intermedieteToken
    // console.log({ bridgeConfigIntermedieteToken })
    /**
    /**
     * FYI Bridge fee done in decimals of NUSD/SYN (18 decimals)
     */
    // console.log([
    //   bridgeConfigIntermedieteToken.addresses[toChainId],
    //   toChainId,
    //   amountToGive.mul(
    //     BigNumber.from(10).pow(18 - fromCoin.decimals[fromChainId])
    //   )
    // ])
    const bridgeFeeRequest = bridgeConfigContract.calculateSwapFee(
      bridgeConfigIntermedieteToken.addresses[toChainId],
      toChainId,
      amountToGive.mul(
        BigNumber.from(10).pow(18 - fromCoin.decimals[fromChainId])
      )
    )

    let amountToReceiveFromChain
    if (amountToGive.isZero()) {
      amountToReceiveFromChain = Zero
    } else if (MINT_BURN_TOKENS.map(t => t.symbol).includes(fromCoin.symbol)) {
      amountToReceiveFromChain = amountToGive
    } else if (fromChainId == ChainId.ETH) {
      if ([ChainId.ARBITRUM, ChainId.BOBA].includes(toChainId) && (toCoin.swapableType == "ETH")) {
        amountToReceiveFromChain = amountToGive
      } else {
        const liquidityAmounts = fromChainTokens.map(t => {
          if (t.symbol === fromCoin.symbol) {
            return amountToGive
          } else {
            return 0
          }
        })
        amountToReceiveFromChain = await fromChainZapContract.calculateTokenAmount(
          liquidityAmounts,
          true,
          { gasLimit: MAX_GAS_THRESHOLD[fromChainId] }
        )
      }
    } else {
      amountToReceiveFromChain = await fromChainZapContract.calculateSwap(
        intermedieteToken.addresses[fromChainId],
        tokenIndexFrom,
        0,
        amountToGive,
      )
    }

    // const bridgeFee = await bridgeConfigContract.calculateSwapFee(
    //   intermedieteToken.addresses[toChainId],
    //   toChainId,
    //   amountToReceiveFromChain
    // )
    // console.log("... ... ...")
    const bridgeFee = await bridgeFeeRequest
    // console.log("postfee")
    // console.log({ amountToReceiveFromChain, amountToGive, bridgeFee, toCoin })
    // console.log(bridgeFee)
    amountToReceiveFromChain = safeBnSubtract(
      amountToReceiveFromChain,
      bridgeFee
    )


    let amountToReceiveToChain
    if (amountToReceiveFromChain.isZero()) {
      amountToReceiveToChain = Zero
    } else if (MINT_BURN_TOKENS.map(t => t.symbol).includes(toCoin.symbol)) {
      amountToReceiveToChain = amountToReceiveFromChain
    } else if (toChainId == ChainId.ETH) {
      if ([ChainId.ARBITRUM, ChainId.BOBA].includes(fromChainId) && (fromCoin.swapableType == "ETH")) {
        amountToReceiveToChain = amountToReceiveFromChain
      } else {
        const liquidityAmounts = toChainTokens.map(t =>
          amountToReceiveFromChain
            .div(3)
            .div(BigNumber.from(10).pow(18 - t.decimals[toChainId]))
        )

        amountToReceiveToChain = await toChainZapContract.calculateTokenAmount(
          liquidityAmounts,
          false,
          { gasLimit: MAX_GAS_THRESHOLD[ChainId.ETH] }
        )

        amountToReceiveToChain = amountToReceiveToChain
          .mul(BigNumber.from(10).pow(toCoin.decimals[toChainId]))
          .div(BigNumber.from(10).pow(18))
      }


    } else {
      amountToReceiveToChain = await toChainZapContract.calculateSwap(
        intermedieteToken.addresses[toChainId],
        0,
        tokenIndexTo,
        amountToReceiveFromChain
      )
    }

    return {
      amountToReceive: amountToReceiveToChain,
      bridgeFee: bridgeFee ?? Zero
    }
  }
}


function safeBnSubtract(a, b) {
  if (a.gt(b)) {
    return a.sub(b)
  } else {
    return Zero
  }
}



// let intermedieteToken
// let bridgeConfigIntermedieteToken
// if (fromCoin.swapableType === "SYN") {
//   intermedieteToken = SYN
// } else if (fromCoin.swapableType === "ETH") {
//   intermedieteToken = NETH
//   if (toChainId == ChainId.ETH) {
//     bridgeConfigIntermedieteToken = WETH
//     // if (fromCoin.symbol == NETH.symbol) {
//     //   intermedieteToken = NETH
//     // } else {
//     //   intermedieteToken = WETH
//     // }
//   } else {
//     bridgeConfigIntermedieteToken = NETH
//   }

// } else {
//   intermedieteToken = NUSD
// }
// bridgeConfigIntermedieteToken = bridgeConfigIntermedieteToken ?? intermedieteToken
// console.log({ bridgeConfigIntermedieteToken })
// /**
//  * FYI Bridge fee done in decimals of NUSD/SYN (18 decimals)
//  */
// console.log([
//   bridgeConfigIntermedieteToken.addresses[toChainId],
//   toChainId,
//   amountToGive.mul(
//     BigNumber.from(10).pow(18 - fromCoin.decimals[fromChainId])
//   )
// ])
// const bridgeFeeRequest = bridgeConfigContract.calculateSwapFee(
//   bridgeConfigIntermedieteToken.addresses[toChainId],
//   toChainId,
//   amountToGive.mul(
//     BigNumber.from(10).pow(18 - fromCoin.decimals[fromChainId])
//   )
// )
