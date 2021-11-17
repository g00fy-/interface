import _ from 'lodash'
import { ChainId } from '@constants/networks'
import {
  BSC_STABLE_SWAP_TOKEN,
  BSC_NUSD_SWAP_TOKEN,

  POLYGON_STABLE_SWAP_TOKEN,
  POLYGON_NUSD_SWAP_TOKEN,

  FANTOM_STABLE_SWAP_TOKEN,
  FANTOM_NUSD_SWAP_TOKEN,

  AVALANCHE_STABLE_SWAP_TOKEN,
  AVALANCHE_NUSD_SWAP_TOKEN,

  ARBITRUM_NUSD_SWAP_TOKEN,
  ARBITRUM_STABLE_SWAP_TOKEN,
  HARMONY_STABLE_SWAP_TOKEN,
  HARMONY_NUSD_SWAP_TOKEN,

} from '@constants/tokens/swap'

import {
  BOBA_ETH_SWAP_TOKEN,
  ARBITRUM_ETH_SWAP_TOKEN
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


export const BASIC_POOLS_BY_CHAIN = {
  [ChainId.BSC]:       [BSC_POOL_SWAP_TOKEN, BSC_STABLE_SWAP_TOKEN],
  [ChainId.ETH]:       [ETH_POOL_SWAP_TOKEN],
  [ChainId.POLYGON]:   [POLYGON_POOL_SWAP_TOKEN, POLYGON_STABLE_SWAP_TOKEN],
  [ChainId.FANTOM]:    [FANTOM_POOL_SWAP_TOKEN, FANTOM_STABLE_SWAP_TOKEN],
  [ChainId.ARBITRUM]:  [ARBITRUM_ETH_SWAP_TOKEN, ARBITRUM_POOL_SWAP_TOKEN, ARBITRUM_STABLE_SWAP_TOKEN],
  [ChainId.AVALANCHE]: [AVALANCHE_POOL_SWAP_TOKEN, AVALANCHE_STABLE_SWAP_TOKEN],
  [ChainId.HARMONY]:   [HARMONY_POOL_SWAP_TOKEN, HARMONY_STABLE_SWAP_TOKEN],
  [ChainId.BOBA]:      [BOBA_POOL_SWAP_TOKEN],                                                            // BOBA_ETH_SWAP_TOKEN,

}

export const METAPOOLS_BY_CHAIN = {
  [ChainId.BSC]:       [BSC_NUSD_SWAP_TOKEN],
  [ChainId.ETH]:       [],
  [ChainId.POLYGON]:   [POLYGON_NUSD_SWAP_TOKEN],
  [ChainId.FANTOM]:    [FANTOM_NUSD_SWAP_TOKEN],
  [ChainId.ARBITRUM]:  [ARBITRUM_NUSD_SWAP_TOKEN],
  [ChainId.AVALANCHE]: [AVALANCHE_NUSD_SWAP_TOKEN],
  [ChainId.HARMONY]:   [HARMONY_NUSD_SWAP_TOKEN],

}

export const SELECTABLE_POOLS_BY_CHAIN = {
  [ChainId.ETH]:       [ETH_POOL_SWAP_TOKEN],
  [ChainId.BSC]:       [BSC_POOL_SWAP_TOKEN, BSC_NUSD_SWAP_TOKEN],
  [ChainId.POLYGON]:   [POLYGON_POOL_SWAP_TOKEN, POLYGON_NUSD_SWAP_TOKEN],
  [ChainId.FANTOM]:    [FANTOM_POOL_SWAP_TOKEN, FANTOM_NUSD_SWAP_TOKEN],
  [ChainId.AVALANCHE]: [AVALANCHE_POOL_SWAP_TOKEN, AVALANCHE_NUSD_SWAP_TOKEN],
  [ChainId.HARMONY]:   [HARMONY_POOL_SWAP_TOKEN, HARMONY_NUSD_SWAP_TOKEN],
  [ChainId.ARBITRUM]:  [ARBITRUM_ETH_SWAP_TOKEN, ARBITRUM_POOL_SWAP_TOKEN, ARBITRUM_NUSD_SWAP_TOKEN],
  [ChainId.BOBA]:      [BOBA_POOL_SWAP_TOKEN],                                                          // BOBA_ETH_SWAP_TOKEN,
}



let POOLS_BY_CHAIN = {}
for (const [chainId, swapTokens] of _.entries(BASIC_POOLS_BY_CHAIN)) {
  if (!POOLS_BY_CHAIN[chainId]) {
    POOLS_BY_CHAIN[chainId] = []
  }
  POOLS_BY_CHAIN[chainId] = POOLS_BY_CHAIN[chainId].concat(swapTokens)
}

for (const [chainId, swapTokens] of _.entries(METAPOOLS_BY_CHAIN)) {
  if (!POOLS_BY_CHAIN[chainId]) {
    POOLS_BY_CHAIN[chainId] = []
  }
  POOLS_BY_CHAIN[chainId] = POOLS_BY_CHAIN[chainId].concat(swapTokens)
}

let CHAINS_BY_POOL_NAME = {}
for (const [chainId, swapTokens] of _.entries(BASIC_POOLS_BY_CHAIN)) {

  for (const swapToken of swapTokens) {
    CHAINS_BY_POOL_NAME[swapToken.poolName] = chainId
  }
}

for (const [chainId, swapTokens] of _.entries(METAPOOLS_BY_CHAIN)) {
  for (const swapToken of swapTokens) {
    CHAINS_BY_POOL_NAME[swapToken.poolName] = chainId
  }
}



export { POOLS_BY_CHAIN, CHAINS_BY_POOL_NAME }



