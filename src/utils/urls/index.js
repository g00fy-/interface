import { SYN } from '@constants/tokens/basic'

import { ChainId } from '@constants/networks'
// Hardcoding this shit for now until actual plan around routing
console.log(process.env?.NODE_ENV)
let SYNAPSE_BASE_URL
if (process.env?.NODE_ENV === 'development') {
  SYNAPSE_BASE_URL = 'http://localhost:3000'
} else {
  SYNAPSE_BASE_URL = 'https://synapseprotocol.com'
}

let SYNAPSE_HOME_URL
if (process.env?.NODE_ENV === 'development') {
  SYNAPSE_HOME_URL = 'http://localhost:3000/home'
} else {
  SYNAPSE_HOME_URL = 'https://synapseprotocol.com'
}

export { SYNAPSE_BASE_URL, SYNAPSE_HOME_URL }


export const BASE_PATH = '/'

export const AIRDROP_PATH    = '/claim'
export const SWAP_PATH       = '/swap'
export const STAKE_PATH      = '/stake'
export const POOLS_PATH      = '/pools'
export const BRIDGE_PATH     = '/'
export const CONTRACTS_PATH  = '/contracts'
export const PORTFOLIO_PATH  = '/portfolio'
export const STATISTICS_PATH = '/statistics'

export const SYNAPSE_PFP_PATH = '/returntomonke'


export function getPoolUrl({ token, poolRouterIndex }) {
  if (token) {
    return `${POOLS_PATH}/${token.routerIndex}`
  }

  return `${POOLS_PATH}/${poolRouterIndex}`
}


export const BSCSCAN_BASE_URL       = 'https://bscscan.com'
export const ETHERSCAN_BASE_URL     = 'https://etherscan.com'
export const POLYGONSCAN_BASE_URL   = 'https://polygonscan.com'
export const BOBASCAN_BASE_URL      = 'https://blockexplorer.boba.network'
export const MOONSCAN_BASE_URL      = 'https://moonriver.moonscan.io'
export const ARBISCAN_BASE_URL      = 'https://arbiscan.io'
export const AVALANCHESCAN_BASE_URL = 'https://snowtrace.io'
export const FANTOMSCAN_BASE_URL    = 'https://ftmscan.com'
export const HARMONYSCAN_BASE_URL   = 'https://explorer.harmony.one'

export function getExplorerTxUrl({ hash, data, chainId=56, type="tx" }) {
  let baseUrl
  if (chainId == ChainId.ETH) {
    baseUrl = ETHERSCAN_BASE_URL
  } else if (chainId == ChainId.BSC) {
    baseUrl = BSCSCAN_BASE_URL
  } else if (chainId == ChainId.POLYGON) {
    baseUrl = POLYGONSCAN_BASE_URL
  } else if (chainId == ChainId.FANTOM) {
    baseUrl = FANTOMSCAN_BASE_URL
  } else if (chainId == ChainId.BOBA) {
    baseUrl = BOBASCAN_BASE_URL
  } else if (chainId == ChainId.MOONRIVER) {
    baseUrl = MOONSCAN_BASE_URL
  } else if (chainId == ChainId.ARBITRUM) {
    baseUrl = ARBISCAN_BASE_URL
  } else if (chainId == ChainId.AVALANCHE) {
    baseUrl = AVALANCHESCAN_BASE_URL
  } else if (chainId == ChainId.HARMONY) {
    baseUrl = HARMONYSCAN_BASE_URL
  } else {
    baseUrl = BSCSCAN_BASE_URL
  }
  return `${baseUrl}/${type}/${hash ?? data}`
}


export function getCompleteUrl(uriPath) {
  return `${SYNAPSE_BASE_URL}${uriPath}`
}

export const DOCS_URL     = 'https://docs.synapseprotocol.com'
export const DISCORD_URL  = 'https://discord.gg/synapseprotocol'
export const TELEGRAM_URL = 'https://t.me/synapseprotocol'
export const FORUM_URL    = 'https://t.me/synapseprotocol'
export const TWITTER_URL  = 'https://twitter.com/SynapseProtocol'
// Patching this as docs for now need to swap w/ git link
export const GITHUB_URL = 'https://docs.synapseprotocol.com'



export const SYNAPSE_DOCS_URL = 'https://docs.synapseprotocol.com'

const SUSHISWAP_BASE_URL = "https://app.sushi.com"

function getSushiSwapUrl({fromCoin, toCoin, chainId }) {
  const inputCurrency = fromCoin?.addresses?.[chainId] ?? ""
  const outputCurrency = toCoin?.addresses?.[chainId] ?? ""
  return `${SUSHISWAP_BASE_URL}/swap?inputCurrency=${inputCurrency}&outputCurrency=${outputCurrency}`
}


const TRADERJOE_BASE_URL = `https://www.traderjoexyz.com/#`

function getTraderJoeSwapUrl({ fromCoin, toCoin, chainId }) {
  const inputCurrency = fromCoin?.addresses?.[chainId] ?? ""
  const outputCurrency = toCoin?.addresses?.[chainId] ?? ""
  return `${TRADERJOE_BASE_URL}/trade?inputCurrency=${inputCurrency}&outputCurrency=${outputCurrency}`
}


export function getBuySynUrl({ chainId }) {
  const params = { toCoin: SYN, chainId }

  switch (chainId) {
    case ChainId.ETH: return getSushiSwapUrl(params)
    case ChainId.AVALANCHE: return getTraderJoeSwapUrl(params)
    default:
      return getSushiSwapUrl(params)
  }
}









