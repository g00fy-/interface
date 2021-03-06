import {
  BSC_STABLE_SWAP_TOKEN,
  BSC_NUSD_SWAP_TOKEN,
  POLYGON_NUSD_SWAP_TOKEN,
  AVALANCHE_NUSD_SWAP_TOKEN,
  AVALANCHE_STABLE_SWAP_TOKEN,
  POLYGON_STABLE_SWAP_TOKEN,
  ARBITRUM_NUSD_SWAP_TOKEN,
  FANTOM_STABLE_SWAP_TOKEN,
  FANTOM_NUSD_SWAP_TOKEN,
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
  BOBA_POOL_SWAP_TOKEN,
  AVALANCHE_POOL_SWAP_TOKEN,
  ARBITRUM_POOL_SWAP_TOKEN,
  HARMONY_POOL_SWAP_TOKEN,
} from '@constants/tokens/poolswap'


export const PRICE_UNITS_INDEX = {
  [ETH_POOL_SWAP_TOKEN.poolName]:       'USD',
  [BSC_POOL_SWAP_TOKEN.poolName]:       'USD',
  [POLYGON_POOL_SWAP_TOKEN.poolName]:   'USD',
  [FANTOM_POOL_SWAP_TOKEN.poolName]:    'USD',
  [BOBA_POOL_SWAP_TOKEN.poolName]:      'USD',
  [AVALANCHE_POOL_SWAP_TOKEN.poolName]: 'USD',
  [ARBITRUM_POOL_SWAP_TOKEN.poolName]:  'USD',
  [HARMONY_POOL_SWAP_TOKEN.poolName]:   'USD',

  [BSC_STABLE_SWAP_TOKEN.poolName]:       'USD',
  [POLYGON_STABLE_SWAP_TOKEN.poolName]:   'USD',
  [FANTOM_STABLE_SWAP_TOKEN.poolName]:    'USD',
  [AVALANCHE_STABLE_SWAP_TOKEN.poolName]: 'USD',
  [HARMONY_STABLE_SWAP_TOKEN.poolName]:   'USD',

  [BSC_NUSD_SWAP_TOKEN.poolName]:       'USD',
  [POLYGON_NUSD_SWAP_TOKEN.poolName]:   'USD',
  [FANTOM_NUSD_SWAP_TOKEN.poolName]:    'USD',
  [AVALANCHE_NUSD_SWAP_TOKEN.poolName]: 'USD',
  [HARMONY_NUSD_SWAP_TOKEN.poolName]:   'USD',
  [ARBITRUM_NUSD_SWAP_TOKEN.poolName]:  'USD',
  // [BOBA_ETH_SWAP_TOKEN.poolName]:       'ETH',
  [ARBITRUM_ETH_SWAP_TOKEN.poolName]:   'ETH',
}


