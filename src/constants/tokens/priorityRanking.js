import { ChainId } from '@constants/networks'

import {
  BUSD,
  USDC,
  USDT,
  DAI,
  MIM,
  NUSD,
  NETH,
  WETH,
} from '@constants/tokens/basic'

import {
  ARBITRUM_ETH_SWAP_TOKEN,
  BOBA_ETH_SWAP_TOKEN
} from '@constants/tokens/ethswap'

import {
  ETH_POOL_SWAP_TOKEN,
  BSC_POOL_SWAP_TOKEN,
  POLYGON_POOL_SWAP_TOKEN,
  FANTOM_POOL_SWAP_TOKEN,
  AVALANCHE_POOL_SWAP_TOKEN,
  ARBITRUM_POOL_SWAP_TOKEN,
  HARMONY_POOL_SWAP_TOKEN,
  BOBA_POOL_SWAP_TOKEN
} from '@constants/tokens/poolswap'


export const PRIORITY_RANKING = {
  [ChainId.BSC]: {
    [BUSD.symbol]: [BSC_POOL_SWAP_TOKEN],
    [USDC.symbol]: [BSC_POOL_SWAP_TOKEN],
    [USDT.symbol]: [BSC_POOL_SWAP_TOKEN],
    [NUSD.symbol]: [BSC_POOL_SWAP_TOKEN],
  },
  [ChainId.ETH]: {
    [DAI.symbol]:  [ETH_POOL_SWAP_TOKEN],
    [USDC.symbol]: [ETH_POOL_SWAP_TOKEN],
    [USDT.symbol]: [ETH_POOL_SWAP_TOKEN],
  },
  [ChainId.POLYGON]: {
    [DAI.symbol]:  [POLYGON_POOL_SWAP_TOKEN],
    [USDC.symbol]: [POLYGON_POOL_SWAP_TOKEN],
    [USDT.symbol]: [POLYGON_POOL_SWAP_TOKEN],
    [NUSD.symbol]: [POLYGON_POOL_SWAP_TOKEN],
  },
  [ChainId.FANTOM]: {
    [MIM.symbol]:  [FANTOM_POOL_SWAP_TOKEN],
    [USDC.symbol]: [FANTOM_POOL_SWAP_TOKEN],
    [USDT.symbol]: [FANTOM_POOL_SWAP_TOKEN],
    [NUSD.symbol]: [FANTOM_POOL_SWAP_TOKEN],
  },
  [ChainId.BOBA]: {
    // [WETH.symbol]: [BOBA_ETH_SWAP_TOKEN],
    // [NETH.symbol]: [BOBA_ETH_SWAP_TOKEN],
    [DAI.symbol]:  [BOBA_POOL_SWAP_TOKEN],
    [USDC.symbol]: [BOBA_POOL_SWAP_TOKEN],
    [USDT.symbol]: [BOBA_POOL_SWAP_TOKEN],
    [NUSD.symbol]: [BOBA_POOL_SWAP_TOKEN],
  },
  [ChainId.ARBITRUM]: {
    [WETH.symbol]: [ARBITRUM_ETH_SWAP_TOKEN],
    [NETH.symbol]: [ARBITRUM_ETH_SWAP_TOKEN],
    [MIM.symbol]:  [ARBITRUM_POOL_SWAP_TOKEN],
    [USDC.symbol]: [ARBITRUM_POOL_SWAP_TOKEN],
    [USDT.symbol]: [ARBITRUM_POOL_SWAP_TOKEN],
    [NUSD.symbol]: [ARBITRUM_POOL_SWAP_TOKEN],
  },
  [ChainId.AVALANCHE]: {
    [DAI.symbol]:  [AVALANCHE_POOL_SWAP_TOKEN],
    [USDC.symbol]: [AVALANCHE_POOL_SWAP_TOKEN],
    [USDT.symbol]: [AVALANCHE_POOL_SWAP_TOKEN],
    [NUSD.symbol]: [AVALANCHE_POOL_SWAP_TOKEN],
  },
  [ChainId.HARMONY]: {
    [DAI.symbol]:  [HARMONY_POOL_SWAP_TOKEN],
    [USDC.symbol]: [HARMONY_POOL_SWAP_TOKEN],
    [USDT.symbol]: [HARMONY_POOL_SWAP_TOKEN],
    [NUSD.symbol]: [HARMONY_POOL_SWAP_TOKEN],
  },
}