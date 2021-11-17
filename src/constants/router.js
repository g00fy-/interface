
import { SWAP_POOL_TOKENS } from '@constants/tokens/tokenGroups'

let ROUTER_INDEX = {}
let INVERTED_ROUTER_INDEX = {}

for (const [chainId, arr] of Object.entries(SWAP_POOL_TOKENS)) {
  INVERTED_ROUTER_INDEX[chainId] = {}
  for (const token of arr) {
    ROUTER_INDEX[token.routerIndex] = token.poolName
    INVERTED_ROUTER_INDEX[chainId][token.poolName] = token.routerIndex
  }
}

export {
  ROUTER_INDEX,
  INVERTED_ROUTER_INDEX,
}
