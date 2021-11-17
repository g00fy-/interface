import { ChainId } from '@constants/networks'


import {
  BSC_NUSD_SWAP_TOKEN,
  POLYGON_NUSD_SWAP_TOKEN,
  FANTOM_NUSD_SWAP_TOKEN,
  AVALANCHE_NUSD_SWAP_TOKEN,
  ARBITRUM_NUSD_SWAP_TOKEN,
  HARMONY_NUSD_SWAP_TOKEN,
} from '@constants/tokens/swap'

import {
  BOBA_ETH_SWAP_TOKEN,
  ARBITRUM_ETH_SWAP_TOKEN
} from '@constants/tokens/ethswap'

import {
  BSC_POOL_SWAP_TOKEN,
  POLYGON_POOL_SWAP_TOKEN,
  FANTOM_POOL_SWAP_TOKEN,
  AVALANCHE_POOL_SWAP_TOKEN,
  ARBITRUM_POOL_SWAP_TOKEN,
  HARMONY_POOL_SWAP_TOKEN,

  BOBA_POOL_SWAP_TOKEN
} from '@constants/tokens/poolswap'

import { STAKABLE_TOKENS } from '@constants/tokens/tokenGroups'
import { SYN_ETH_SUSHI_TOKEN } from '@constants/tokens/lp'



// The numbers in staking maps are significant contract wise, do npt fuck with them



let STAKING_MAP_TOKENS = {}
for (const [chainId, arr] of Object.entries(STAKABLE_TOKENS)) {
  STAKING_MAP_TOKENS[chainId] = {}
  for (const token of arr) {
    STAKING_MAP_TOKENS[chainId][token.poolName] = token
  }
}


export {
  STAKING_MAP_TOKENS,
}


export const STAKING_TOKENS = {
  [ChainId.BSC]: [
    BSC_POOL_SWAP_TOKEN,
    BSC_NUSD_SWAP_TOKEN
  ],
  [ChainId.ETH]: [
    SYN_ETH_SUSHI_TOKEN
  ],
  [ChainId.POLYGON]: [
    POLYGON_POOL_SWAP_TOKEN,
    POLYGON_NUSD_SWAP_TOKEN
  ],
  [ChainId.FANTOM]: [
    FANTOM_POOL_SWAP_TOKEN,
    FANTOM_NUSD_SWAP_TOKEN
  ],
  [ChainId.AVALANCHE]: [
    AVALANCHE_POOL_SWAP_TOKEN,
    AVALANCHE_NUSD_SWAP_TOKEN
  ],
  [ChainId.ARBITRUM]: [
    ARBITRUM_ETH_SWAP_TOKEN,
    ARBITRUM_POOL_SWAP_TOKEN,
    ARBITRUM_NUSD_SWAP_TOKEN
  ],
  [ChainId.HARMONY]: [
    HARMONY_POOL_SWAP_TOKEN,
    HARMONY_NUSD_SWAP_TOKEN
  ],
  [ChainId.BOBA]: [
    // BOBA_ETH_SWAP_TOKEN,
    BOBA_POOL_SWAP_TOKEN
  ],
  [ChainId.MOONRIVER]: [],
}