import { ChainId } from '@constants/networks'

import { SYN_ETH_SUSHI_TOKEN } from '@constants/tokens/lp'

import {
  BSC_STABLE_SWAP_TOKEN,
  BSC_NUSD_SWAP_TOKEN,

  POLYGON_STABLE_SWAP_TOKEN,
  POLYGON_NUSD_SWAP_TOKEN,

  FANTOM_NUSD_SWAP_TOKEN,
  FANTOM_STABLE_SWAP_TOKEN,

  AVALANCHE_STABLE_SWAP_TOKEN,
  AVALANCHE_NUSD_SWAP_TOKEN,

  ARBITRUM_NUSD_SWAP_TOKEN,

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

import { WETH, ETH, NETH, NUSD, SYN, FRAX } from '@constants/tokens/basic'
import { DOG, HIGHSTREET, JUMP } from '@constants/tokens/mintable'


export const POOL_TOKEN_LOOKUP_BY_NAME = {
  [BSC_POOL_SWAP_TOKEN.poolName]:       {
    newPoolToken: BSC_POOL_SWAP_TOKEN,
    oldPoolToken: BSC_NUSD_SWAP_TOKEN
  },
  [POLYGON_POOL_SWAP_TOKEN.poolName]:   {
    newPoolToken: POLYGON_POOL_SWAP_TOKEN,
    oldPoolToken: POLYGON_NUSD_SWAP_TOKEN
  },
  [FANTOM_POOL_SWAP_TOKEN.poolName]:    {
    newPoolToken: FANTOM_POOL_SWAP_TOKEN,
    oldPoolToken: FANTOM_NUSD_SWAP_TOKEN
  },
  [AVALANCHE_POOL_SWAP_TOKEN.poolName]: {
    newPoolToken: AVALANCHE_POOL_SWAP_TOKEN,
    oldPoolToken: AVALANCHE_NUSD_SWAP_TOKEN
  },
  [ARBITRUM_POOL_SWAP_TOKEN.poolName]:  {
    newPoolToken: ARBITRUM_POOL_SWAP_TOKEN,
    oldPoolToken: ARBITRUM_NUSD_SWAP_TOKEN
  },
  [HARMONY_POOL_SWAP_TOKEN.poolName]:   {
    newPoolToken: HARMONY_POOL_SWAP_TOKEN,
    oldPoolToken: HARMONY_NUSD_SWAP_TOKEN
  },
}


export const STAKABLE_TOKENS = {
  [ChainId.BSC]: [
    BSC_POOL_SWAP_TOKEN,
    BSC_NUSD_SWAP_TOKEN
  ],
  [ChainId.ETH]: [
    ETH_POOL_SWAP_TOKEN,
    SYN_ETH_SUSHI_TOKEN
  ],
  [ChainId.POLYGON]: [
    POLYGON_POOL_SWAP_TOKEN,
    POLYGON_NUSD_SWAP_TOKEN
  ],
  [ChainId.BOBA]: [
    BOBA_POOL_SWAP_TOKEN,
    // BOBA_ETH_SWAP_TOKEN
  ],
  [ChainId.MOONRIVER]: [],
  [ChainId.ARBITRUM]: [
    ARBITRUM_ETH_SWAP_TOKEN,
    ARBITRUM_POOL_SWAP_TOKEN,
    ARBITRUM_NUSD_SWAP_TOKEN
  ],
  [ChainId.AVALANCHE]: [
    AVALANCHE_POOL_SWAP_TOKEN,
    AVALANCHE_NUSD_SWAP_TOKEN
  ],
  [ChainId.FANTOM]: [
    FANTOM_POOL_SWAP_TOKEN,
    FANTOM_NUSD_SWAP_TOKEN
  ],
  [ChainId.HARMONY]: [
    HARMONY_POOL_SWAP_TOKEN,
    HARMONY_NUSD_SWAP_TOKEN
  ],

}


export const SWAP_POOL_TOKENS = {
  [ChainId.ETH]: [
    ETH_POOL_SWAP_TOKEN
  ],
  [ChainId.BSC]: [
    BSC_STABLE_SWAP_TOKEN,
    BSC_NUSD_SWAP_TOKEN,
    BSC_POOL_SWAP_TOKEN,
  ],
  [ChainId.POLYGON]: [
    POLYGON_STABLE_SWAP_TOKEN,
    POLYGON_NUSD_SWAP_TOKEN,
    POLYGON_POOL_SWAP_TOKEN,
  ],
  [ChainId.FANTOM]: [
    FANTOM_STABLE_SWAP_TOKEN,
    FANTOM_NUSD_SWAP_TOKEN,
    FANTOM_POOL_SWAP_TOKEN,
  ],
  [ChainId.BOBA]: [
    // BOBA_ETH_SWAP_TOKEN,
    BOBA_POOL_SWAP_TOKEN,
  ],
  [ChainId.MOONRIVER]: [],
  [ChainId.ARBITRUM]: [
    ARBITRUM_ETH_SWAP_TOKEN,
    ARBITRUM_NUSD_SWAP_TOKEN,
    ARBITRUM_POOL_SWAP_TOKEN,
  ],
  [ChainId.AVALANCHE]: [
    AVALANCHE_STABLE_SWAP_TOKEN,
    AVALANCHE_NUSD_SWAP_TOKEN,
    AVALANCHE_POOL_SWAP_TOKEN,
  ],
  [ChainId.HARMONY]: [
    HARMONY_STABLE_SWAP_TOKEN,
    HARMONY_NUSD_SWAP_TOKEN,
    HARMONY_POOL_SWAP_TOKEN,
  ],
}






export const BRIDGE_ZAP_USD_SWAP_TOKEN_BY_CHAIN = {
  [ChainId.BSC]:       BSC_POOL_SWAP_TOKEN,
  [ChainId.ETH]:       ETH_POOL_SWAP_TOKEN,
  [ChainId.POLYGON]:   POLYGON_POOL_SWAP_TOKEN,
  [ChainId.FANTOM]:    FANTOM_POOL_SWAP_TOKEN,
  [ChainId.BOBA]:      BOBA_POOL_SWAP_TOKEN,
  [ChainId.ARBITRUM]:  ARBITRUM_POOL_SWAP_TOKEN,
  [ChainId.AVALANCHE]: AVALANCHE_POOL_SWAP_TOKEN,
  [ChainId.HARMONY]:   HARMONY_POOL_SWAP_TOKEN,

}

export const USD_SWAP_TOKENS = _.values(BRIDGE_ZAP_USD_SWAP_TOKEN_BY_CHAIN)

export const BRIDGE_ZAP_ETH_SWAP_TOKEN_BY_CHAIN = {
  [ChainId.BSC]:       undefined,
  [ChainId.ETH]:       {poolTokens:[ETH], isNative: true},
  [ChainId.POLYGON]:   undefined,
  [ChainId.FANTOM]:    undefined,
  [ChainId.BOBA]:      undefined, // BOBA_ETH_SWAP_TOKEN,
  [ChainId.MOONRIVER]: undefined,
  [ChainId.ARBITRUM]:  ARBITRUM_ETH_SWAP_TOKEN,
  [ChainId.AVALANCHE]: undefined,
  [ChainId.HARMONY]:   undefined,

}



export const BRIDGE_SWAPABLE_TYPES_BY_CHAIN = {
  [ChainId.BSC]:       ["USD", "SYN"],
  [ChainId.ETH]:       ["USD", "ETH", "SYN"],
  [ChainId.POLYGON]:   ["USD", "SYN"],
  [ChainId.FANTOM]:    ["USD", "SYN"],
  [ChainId.BOBA]:      ["USD", "SYN"],          // "ETH",
  [ChainId.MOONRIVER]: [ "SYN"],          // "ETH",
  [ChainId.ARBITRUM]:  ["ETH", "USD", "SYN"],
  [ChainId.AVALANCHE]: ["USD", "SYN"],
  [ChainId.HARMONY]:   ["USD", "SYN"],

}

export const BRIDGE_CHAINS_BY_TYPE = {
  USD:        [ChainId.ETH, ChainId.ARBITRUM, ChainId.AVALANCHE, ChainId.BSC, ChainId.POLYGON, ChainId.FANTOM, ChainId.HARMONY, ChainId.BOBA],
  ETH:        [ChainId.ETH, ChainId.ARBITRUM],                                                                                                   // , ChainId.BOBA
  SYN:        [ChainId.ETH, ChainId.ARBITRUM, ChainId.AVALANCHE, ChainId.BSC, ChainId.POLYGON, ChainId.FANTOM, ChainId.HARMONY, ChainId.BOBA],
  HIGHSTREET: [ChainId.ETH, ChainId.BSC],
  DOG:        [ChainId.ETH, ChainId.BSC],
  JUMP:       [ChainId.FANTOM, ChainId.BSC],
  FRAX:       [ChainId.ETH, ChainId.MOONRIVER]
}


function moveFirstToLast(arr) {
  return [
    ...arr.slice(1, arr.length),
    arr[0]
  ]
}



export const BRIDGE_SWAPABLE_TOKENS_BY_TYPE = {
  [ChainId.ETH]: {
    USD:        [...ETH_POOL_SWAP_TOKEN.poolTokens, NUSD],
    ETH:        [ETH],
    SYN:        [SYN],
    HIGHSTREET: [HIGHSTREET],
    DOG:        [DOG],
    FRAX: [FRAX],
  },
  [ChainId.BSC]: {
    USD:        moveFirstToLast(BSC_POOL_SWAP_TOKEN.poolTokens),
    SYN:        [SYN],
    HIGHSTREET: [HIGHSTREET],
    DOG:        [DOG],
    JUMP: [JUMP]
  },
  [ChainId.POLYGON]: {
    USD: moveFirstToLast(POLYGON_POOL_SWAP_TOKEN.poolTokens),
    SYN: [SYN]
  },
  [ChainId.FANTOM]: {
    USD: moveFirstToLast(FANTOM_POOL_SWAP_TOKEN.poolTokens),
    SYN: [SYN],
    JUMP: [JUMP]
  },
  [ChainId.BOBA]: {
    USD: moveFirstToLast(BOBA_POOL_SWAP_TOKEN.poolTokens),
    // ETH: BOBA_ETH_SWAP_TOKEN.poolTokens,
    SYN: [SYN]
  },
  [ChainId.MOONRIVER]: {
    FRAX: [FRAX],
    // ETH: BOBA_ETH_SWAP_TOKEN.poolTokens,
    SYN: [SYN]
  },
  [ChainId.ARBITRUM]: {
    USD: moveFirstToLast(ARBITRUM_POOL_SWAP_TOKEN.poolTokens),
    ETH: ARBITRUM_ETH_SWAP_TOKEN.poolTokens,
    SYN: [SYN]
  },
  [ChainId.AVALANCHE]: {
    USD: moveFirstToLast(AVALANCHE_POOL_SWAP_TOKEN.poolTokens),
    SYN: [SYN]
  },
  [ChainId.HARMONY]: {
    USD: moveFirstToLast(HARMONY_POOL_SWAP_TOKEN.poolTokens),
    SYN: [SYN]
  }
}

let BRIDGE_SWAPABLE_TOKENS_BY_CHAIN = {}
for (const [chainId, typeObj] of _.entries(BRIDGE_SWAPABLE_TOKENS_BY_TYPE)) {
  BRIDGE_SWAPABLE_TOKENS_BY_CHAIN[chainId] = _.flattenDeep(
    _.entries(typeObj).map( ([swapableType, poolTokens]) => poolTokens)
  )
}

export { BRIDGE_SWAPABLE_TOKENS_BY_CHAIN }

const FRAX_SPOOFED_SWAP_TOKEN = { poolTokens: [FRAX] }
const JUMP_SPOOFED_SWAP_TOKEN = { poolTokens: [JUMP] }
const HIGHSTREET_SPOOFED_SWAP_TOKEN = { poolTokens: [HIGHSTREET] }
const DOG_SPOOFED_SWAP_TOKEN = { poolTokens: [DOG] }
const SYN_SPOOFED_SWAP_TOKEN = { poolTokens: [SYN] }
const ETH_SPOOFED_SWAP_TOKEN = { poolTokens: [WETH]}


export const BRIDGE_SWAPABLE_TYPE_POOLS_BY_CHAIN = {
  [ChainId.ETH]: {
    ETH:        ETH_SPOOFED_SWAP_TOKEN,
    USD:        ETH_POOL_SWAP_TOKEN,
    SYN:        SYN_SPOOFED_SWAP_TOKEN,
    HIGHSTREET: HIGHSTREET_SPOOFED_SWAP_TOKEN,
    DOG:        DOG_SPOOFED_SWAP_TOKEN,
    FRAX:       FRAX_SPOOFED_SWAP_TOKEN,
  },
  [ChainId.BSC]: {
    USD:        BSC_POOL_SWAP_TOKEN,
    SYN:        SYN_SPOOFED_SWAP_TOKEN,
    HIGHSTREET: HIGHSTREET_SPOOFED_SWAP_TOKEN,
    DOG:        DOG_SPOOFED_SWAP_TOKEN,
    JUMP:       JUMP_SPOOFED_SWAP_TOKEN
  },
  [ChainId.POLYGON]: {
    USD: POLYGON_POOL_SWAP_TOKEN,
    SYN: SYN_SPOOFED_SWAP_TOKEN,
  },
  [ChainId.FANTOM]: {
    USD: FANTOM_POOL_SWAP_TOKEN,
    SYN: SYN_SPOOFED_SWAP_TOKEN,
    JUMP: JUMP_SPOOFED_SWAP_TOKEN
  },
  [ChainId.BOBA]: {
    // ETH: BOBA_ETH_SWAP_TOKEN,
    USD: BOBA_POOL_SWAP_TOKEN,
    SYN: SYN_SPOOFED_SWAP_TOKEN,
  },
  [ChainId.MOONRIVER]: {
    // ETH: BOBA_ETH_SWAP_TOKEN,
    FRAX: FRAX_SPOOFED_SWAP_TOKEN,
    SYN: SYN_SPOOFED_SWAP_TOKEN,
  },
  [ChainId.ARBITRUM]: {
    ETH: ARBITRUM_ETH_SWAP_TOKEN,
    USD: ARBITRUM_POOL_SWAP_TOKEN,
    SYN: SYN_SPOOFED_SWAP_TOKEN,
  },
  [ChainId.AVALANCHE]: {
    USD: AVALANCHE_POOL_SWAP_TOKEN,
    SYN: SYN_SPOOFED_SWAP_TOKEN,
  },
  [ChainId.HARMONY]: {
    USD: HARMONY_POOL_SWAP_TOKEN,
    SYN: SYN_SPOOFED_SWAP_TOKEN,
  }
}





export const MINT_BURN_TOKENS = [
  NUSD,
  SYN,
  NETH,
  HIGHSTREET,
  DOG,
  JUMP,
  FRAX
]
