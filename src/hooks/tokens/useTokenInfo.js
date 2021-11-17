import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

/**
 * @param {Token} token
 */
export function useTokenInfo(token) {
  const { chainId } = useActiveWeb3React()
  return {
    ...token,
    address:            token?.addresses?.[chainId],
    swapAddress:        token?.swapAddresses?.[chainId],
    swapDepositAddress: token?.swapDepositAddresses?.[chainId],
    swapEthAddress:     token?.swapEthAddresses?.[chainId],
    poolId:             token?.poolId?.[chainId],
    decimals:           token?.decimals?.[chainId]
  }
}


/**
 * @param {number} chainId
 * @param {Token} token
 */
export function getTokenOnChain(chainId, token) {
  return {
    ...token,
    address:            token?.addresses?.[chainId],
    swapAddress:        token?.swapAddresses?.[chainId],
    swapDepositAddress: token?.swapDepositAddresses?.[chainId],
    swapEthAddress:     token?.swapEthAddresses?.[chainId],
    poolId:             token?.poolId?.[chainId],
    decimals:           token?.decimals?.[chainId]
  }
}

