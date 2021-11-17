import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useLocalStorage } from '@hooks/useLocalStorage'

import createPersistedState from 'use-persisted-state'

const usePassthroughDestinationInfo = createPersistedState('destinationInfo123')


export function useDestinationInfo() {
  const { account } = useActiveWeb3React()
  const [destinationInfo, setDestinationInfo] = usePassthroughDestinationInfo({})

  const addressesForAccount = destinationInfo[account] ?? []

  function setAddressesForAccount(destAddr) {
    setDestinationInfo({
      [account]: [destAddr, ...addressesForAccount],
      ...destinationInfo,

    })
  }

  return [addressesForAccount, setAddressesForAccount]
}