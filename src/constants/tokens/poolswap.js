import nerveLogo from '@assets/icons/synapse.svg'

import { Token } from '@utils/classes/Token'
import { SYNAPSE_DOCS_URL } from '@urls'
import { ChainId } from '@constants/networks'

import {
  BUSD,
  USDC,
  USDT,
  DAI,
  MIM,
  NUSD,
} from '@constants/tokens/basic'

  /**
   * Eth Stablecoin Swap
   */
export const ETH_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.ETH]: NUSD.addresses[ChainId.ETH],
  },
  decimals:      18,
  symbol:        'nUSD',
  name:          'Synapse nUSD LP Token Ethereum',
  logo:          nerveLogo,
  poolName:      'Ethereum Stableswap Pool',
  routerIndex:   'eth3pool',
  poolId:        420,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.ETH]: '0x1116898DdA4015eD8dDefb84b6e8Bc24528Af2d8',
  },
  poolTokens:  [DAI, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token on ETH",
  docUrl:      SYNAPSE_DOCS_URL,
})


// Stablecoin Swap
export const BSC_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.BSC]:     '0xa4b7Bc06EC817785170C2DbC1dD3ff86CDcdcc4C',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Token',
  logo:          nerveLogo,
  poolName:      'BSC Stableswap Pool ', // DONT GET RID OF SPACE AFTER POOL
  routerIndex:   'bscnusd',
  poolId:        1,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.BSC]: '0x28ec0B36F0819ecB5005cAB836F4ED5a2eCa4D13',
  },
  poolTokens:  [NUSD, BUSD, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token",
  docUrl:      SYNAPSE_DOCS_URL,
})

/**
 * Polygon Stablecoin Swap
 */
export const POLYGON_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.POLYGON]: '0x7479e1bc2f2473f9e78c89b4210eb6d55d33b645',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Token Polygon ',
  logo:          nerveLogo,
  poolName:      'Polygon Stableswap Pool ',         // DONT GET RID OF SPACE AFTER POOL
  routerIndex:   'polygonnusd',
  poolId:        1,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.POLYGON]: '0x85fCD7Dd0a1e1A9FCD5FD886ED522dE8221C3EE5',
  },
  poolTokens:  [NUSD, DAI, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token on Polygon/Matic",
  docUrl:      SYNAPSE_DOCS_URL,
})

/**
 * Avalanche Stablecoin Swap
 */
export const AVALANCHE_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.AVALANCHE]: '0xCA87BF3ec55372D9540437d7a86a7750B42C02f4',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Token Avalanche',
  logo:          nerveLogo,
  poolName:      'Avalanche Stableswap Pool ',        // DONT GET RID OF SPACE AFTER POOL
  routerIndex:   'avalanchenusd',
  poolId:        1,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.AVALANCHE]: '0xED2a7edd7413021d440b09D654f3b87712abAB66',
  },
  poolTokens:  [NUSD, DAI, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token on Avalanche",
  docUrl:      SYNAPSE_DOCS_URL,
})


/**
 * Avalanche Stablecoin Swap
 */
export const ARBITRUM_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.ARBITRUM]: '0xADeac0343C2Ac62DFE5A5f51E896AefFF5Ab513E',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Token Arbitrum',
  logo:          nerveLogo,
  poolName:      'Arbitrum Stableswap Pool ',        // DONT GET RID OF SPACE AFTER POOL
  routerIndex:   'arbitrumnusd',
  poolId:        2,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.ARBITRUM]: '0x0Db3FE3B770c95A0B99D1Ed6F2627933466c0Dd8',
  },
  poolTokens:  [NUSD, MIM, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token on Arbitrum",
  docUrl:      SYNAPSE_DOCS_URL,
})


/**
 * Fantom Stablecoin Swap
 */
export const FANTOM_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.FANTOM]: '0x464d121D3cA63cEEfd390D76f19364D3Bd024cD2',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Token Fantom',
  logo:          nerveLogo,
  poolName:      'Fantom Stableswap Pool ',        // DONT GET RID OF SPACE AFTER POOL
  routerIndex:   'fantomnusd',
  poolId:        1,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.FANTOM]: '0x2913E812Cf0dcCA30FB28E6Cac3d2DCFF4497688',
  },
  poolTokens:  [NUSD, MIM, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token on Fantom",
  docUrl:      SYNAPSE_DOCS_URL,
})

/**
* Harmony Stablecoin Swap
*/
export const HARMONY_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.HARMONY]: '0xE269abBFAF52b26D2632F55B6b223A5223088B96',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Token Harmony',
  logo:          nerveLogo,
  poolName:      'Harmony Stableswap Pool ',        // DONT GET RID OF SPACE AFTER POOL
  routerIndex:   'harmonynusd',
  poolId:        1,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.HARMONY]: '0x3ea9B0ab55F34Fb188824Ee288CeaEfC63cf908e',
  },
  poolTokens:  [NUSD, DAI, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token on Harmony",
  docUrl:      SYNAPSE_DOCS_URL,
})



/**
* Boba Stablecoin Swap
*/
export const BOBA_POOL_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.BOBA]: '0x9D7283A6AeeD9BCd4Ac70876fEA2b69a63DD8cb9',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Token Boba',
  logo:          nerveLogo,
  poolName:      'Boba Stableswap Pool ',        // DONT GET RID OF SPACE AFTER POOL
  routerIndex:   'bobanusd',
  poolId:        1,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.BOBA]: '0x75FF037256b36F15919369AC58695550bE72fead',
  },
  poolTokens:  [NUSD, DAI, USDC, USDT],
  description: "Synapse's 4pool stableswap LP token on Boba",
  docUrl:      SYNAPSE_DOCS_URL,
})


