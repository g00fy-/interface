import { NETWORK_CONNECTOR_MAP } from '@connectors'

/**
 * @param {number} chainId
 */
export function getProvider(chainId) {
  // console.log("_______________")
  // // console.log(NETWORK_CONNECTOR_MAP[chainId].provider)
  // console.log({ NETWORK_CONNECTOR_MAP})
  return NETWORK_CONNECTOR_MAP[chainId].providers[chainId]
}
