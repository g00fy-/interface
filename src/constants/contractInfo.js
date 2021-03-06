import { ChainId } from '@constants/networks'
import {
  SYN,
  BUSD,
  USDT,
  USDC,
  DAI,
  NUSD,
  NETH,
  ETH,
  MIM,
  FRAX,
} from '@constants/tokens/basic'

import {
  BOBA_ETH_SWAP_TOKEN,
  ARBITRUM_ETH_SWAP_TOKEN,
} from '@constants/tokens/ethswap'

import {
  ETH_POOL_SWAP_TOKEN,
  BSC_POOL_SWAP_TOKEN,
  POLYGON_POOL_SWAP_TOKEN,
  FANTOM_POOL_SWAP_TOKEN,
  BOBA_POOL_SWAP_TOKEN,
  AVALANCHE_POOL_SWAP_TOKEN,
  ARBITRUM_POOL_SWAP_TOKEN,
  HARMONY_POOL_SWAP_TOKEN,
} from '@constants/tokens/poolswap'



export const CONTRACT_INFO = {
  [ChainId.ETH]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [ETH_POOL_SWAP_TOKEN],
    STABLES:     [DAI, USDC, USDT],
    TOKENS:      [],
  },
  [ChainId.BSC]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [BSC_POOL_SWAP_TOKEN],
    STABLES:     [NUSD, BUSD, USDC, USDT],
    TOKENS:      [],
  },
  [ChainId.POLYGON]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [POLYGON_POOL_SWAP_TOKEN],
    STABLES:     [DAI, USDC, USDT],
    TOKENS:      [],
  },
  [ChainId.FANTOM]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [FANTOM_POOL_SWAP_TOKEN],
    STABLES:     [MIM, USDC, USDT],
    TOKENS:      [],
  },
  [ChainId.BOBA]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [BOBA_POOL_SWAP_TOKEN], // BOBA_ETH_SWAP_TOKEN,
    STABLES:     [DAI, USDC, USDT],
    TOKENS:      [] // [NETH, ETH],
  },
  [ChainId.BOBA]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [],   // BOBA_ETH_SWAP_TOKEN,
    STABLES:     [FRAX],
    TOKENS:      []                        // [NETH, ETH],
  },
  [ChainId.ARBITRUM]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [ARBITRUM_ETH_SWAP_TOKEN, ARBITRUM_POOL_SWAP_TOKEN],
    STABLES:     [MIM, USDC, USDT],
    TOKENS:      [NETH, ETH],
  },
  [ChainId.AVALANCHE]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [AVALANCHE_POOL_SWAP_TOKEN],
    STABLES:     [DAI, USDC, USDT],
    TOKENS:      [],
  },
  [ChainId.HARMONY]: {
    OPERATIONAL: [SYN],
    LP_TOKENS:   [],
    SWAP_TOKENS: [HARMONY_POOL_SWAP_TOKEN],
    STABLES:     [DAI, USDC, USDT],
    TOKENS:      [],
  }
}

