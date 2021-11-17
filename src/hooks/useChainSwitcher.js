import _ from 'lodash'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { ChainId } from '@constants/networks'

import { CHAIN_PARAMS } from '@constants/networks'

const ETH_KEYS_TO_REMOVE = [
  'chainName',
  'nativeCurrency',
  'rpcUrls',
  'blockExplorerUrls'
]


export function useChainSwitcher() {
  const { account, library } = useActiveWeb3React()


  return function triggerChainSwitch(itemChainId) {
    const params = CHAIN_PARAMS[itemChainId]

    if (ChainId.ETH == itemChainId) {
      const ethParams = _.pickBy(params, (value, key) => ETH_KEYS_TO_REMOVE.indexOf(key) === -1)
      return library?.send('wallet_switchEthereumChain', [ethParams, account])
    } else {
      return library?.send('wallet_addEthereumChain', [params, account])
    }
  }
}


