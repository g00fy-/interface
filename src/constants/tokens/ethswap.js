import nerveLogo from '@assets/icons/synapse.svg'

import { Token } from '@utils/classes/Token'
import { SYNAPSE_DOCS_URL } from '@urls'
import { ChainId } from '@constants/networks'

import {
  NETH,
  WETH,
  ETH
} from '@constants/tokens/basic'

/**
 * Avalanche Stablecoin Swap
 */
export const ARBITRUM_ETH_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.ARBITRUM]: '0xD70A52248e546A3B260849386410C7170c7BD1E9',
  },
  decimals:      18,
  symbol:        'nETH-LP',                         // make sure this gets update to match conytract
  name:          'Synapse Eth LP Token Arbitrum',
  logo:          nerveLogo,
  poolName:      'Arbitrum ETH Pool',
  routerIndex:   'arbitrumethpool',
  poolId:        0,
  poolType:      'ETH',
  swapAddresses: {
    [ChainId.ARBITRUM]: '0xa067668661C84476aFcDc6fA5D758C4c01C34352',
  },
  swapEthAddresses: {
    [ChainId.ARBITRUM]: '0x1c3fe783a7c06bfAbd124F2708F5Cc51fA42E102',
  },
  poolTokens:   [NETH, WETH],                                // add eth token whether eth or weth here
  nativeTokens: [NETH, ETH],
  description:  "Synapse's eth swap LP token on Arbitrum",
  docUrl:       SYNAPSE_DOCS_URL,
})


/**
 * Avalanche Stablecoin Swap
 */
export const BOBA_ETH_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.BOBA]: '0x56A28e084B29f975bf0D31fD3aA074647F43728C',
  },
  decimals:      18,
  symbol:        'nETH-LP',                     // make sure this gets update to match conytract
  name:          'Synapse Eth LP Token Boba',
  logo:          nerveLogo,
  poolName:      'Boba ETH Pool',
  routerIndex:   'bobaethpool',
  poolId:        0,
  poolType:      'ETH',
  swapAddresses: {
    [ChainId.BOBA]: '0xaB1EB0B9a0124D89445a547366C9eD61a5180E43',
  },
  swapEthAddresses: {
    [ChainId.BOBA]: '0x06Fea8513FF03a0d3f61324da709D4cf06F42A5c',
  },
  poolTokens:   [NETH, WETH],                                // add eth token whether eth or weth here
  nativeTokens: [NETH, ETH],
  description:  "Synapse's eth swap LP token on Arbitrum",
  docUrl:       SYNAPSE_DOCS_URL,
})
