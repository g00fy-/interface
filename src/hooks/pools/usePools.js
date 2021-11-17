
import _ from 'lodash'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useTokenInfo } from '@hooks/tokens/useTokenInfo'

import {
  BASIC_POOLS_BY_CHAIN,
  METAPOOLS_BY_CHAIN,
  POOLS_BY_CHAIN
} from '@constants/tokens/poolsByChain'


let BASIC_POOLS_MAP = {}
for (const [chainId, arr] of Object.entries(BASIC_POOLS_BY_CHAIN)) {
  BASIC_POOLS_MAP[chainId] = {}
  for (const token of arr) {
    BASIC_POOLS_MAP[chainId][token.poolName] = token.poolTokens
  }
}


let METAPOOLS_MAP = {}
for (const [chainId, arr] of Object.entries(METAPOOLS_BY_CHAIN)) {
  METAPOOLS_MAP[chainId] = {}
  for (const token of arr) {
    METAPOOLS_MAP[chainId][token.poolName] = token.metapoolTokens
  }
}

let METAPOOLS_UNDERLYING_MAP = {}
for (const [chainId, arr] of Object.entries(METAPOOLS_BY_CHAIN)) {
  METAPOOLS_UNDERLYING_MAP[chainId] = {}
  for (const token of arr) {
    METAPOOLS_UNDERLYING_MAP[chainId][token.poolName] = token.poolTokens
  }
}

const POOLS_MAP = _.merge(BASIC_POOLS_MAP, METAPOOLS_UNDERLYING_MAP)








let POOL_NAME_TOKEN_MAP = {}
for (const [chainId, arr] of Object.entries(POOLS_BY_CHAIN)) {
  POOL_NAME_TOKEN_MAP[chainId] = {}
  for (const token of arr) {
    POOL_NAME_TOKEN_MAP[chainId][token.poolName] = token
  }
}

export { POOL_NAME_TOKEN_MAP, POOLS_MAP }








/**
 * @param {string} poolName
 * @return {Token[]}
 */
export function usePool(poolName, otherChainId) {
  const { chainId: activeChainId } = useActiveWeb3React()
  const chainId = otherChainId ?? activeChainId
  return POOLS_MAP[chainId][poolName] ?? []
}


export function useMetapoolMap() {
  const { chainId } = useActiveWeb3React()
  return METAPOOLS_MAP[chainId]
}




export function usePoolToken(poolName) {
  const { chainId } = useActiveWeb3React()
  return POOL_NAME_TOKEN_MAP[chainId][poolName]
}

export function usePoolTokenInfo(poolName) {
  const { chainId } = useActiveWeb3React()
  const tokenInfo = useTokenInfo(POOL_NAME_TOKEN_MAP[chainId][poolName])
  return tokenInfo
}


