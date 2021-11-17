import { useMemo } from 'react'

import { useWeb3React } from '@web3-react/core'

import { ChainId } from '@constants/networks'

import ERC20_ABI from '@abis/erc20.json'

import LPTOKEN_ABI from '@abis/lpToken.json'
import SWAP_ABI from '@abis/swap.json'
import SWAP_ETH_WRAPPER_ABI from '@abis/swapEthWrapper.json'

import META_SWAP_DEPOSIT_ABI from '@abis/metaSwapDeposit.json'
import METASWAP_ABI from '@abis/metaSwap.json'


import { getContract } from '@utils'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'


import { POOL_NAME_TOKEN_MAP, usePoolTokenInfo } from '@hooks/pools/usePools'

import { useTokenInfo } from '@hooks/tokens/useTokenInfo'

/**
 * @param {number} chainId the contract is on
 * @param {string} address the contract address youre targeting
 * @param abi the contract abi to use
 * @param {boolean} withSignerIfPossible (defaults to true)
 * @returns null on errors, otherwise contract
 */
export function useGenericContract(chainId, address, abi, withSignerIfPossible = true) {
  // const { account } = useActiveWeb3React()
  const { library, account } = useWeb3React(`${chainId}`)

  return useMemo(() => {
    if (!address || !abi || !library || (address == '')) {
      return null
    } else {
      try {
        return getContract(
          address,
          abi,
          library,
          withSignerIfPossible && account ? account : undefined
        )
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }
  }, [address, abi, library, withSignerIfPossible, account, chainId])
}

/**
 * @param {string} address the contract address youre targeting
 * @param abi the contract abi to use
 * @param {boolean} withSignerIfPossible (defaults to true)
 * @returns null on errors, otherwise contract
 * */
export function useContract(address, abi, withSignerIfPossible = true) {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !abi || !library || (address == '')) {
      return null
    } else {
      try {
        return getContract(
          address,
          abi,
          library,
          withSignerIfPossible && account ? account : undefined
        )
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }
  }, [address, abi, library, withSignerIfPossible, account, chainId])
}
/**
 * @param {Object.<number,string>} addressObj the contract addresses
 * @param abi the contract abi to use for all the addresses
 * @param {boolean} withSignerIfPossible (defaults to true)
 * @returns null on errors, otherwise object w/ same formate as address obj
 * */
function useContracts(addressObj, abi, withSignerIfPossible = true) {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressObj || !abi || !library ) {
      return null
    } else {
      let resultObj = {}
      for (const [key, address] of Object.entries(addressObj)) {
        if (address != '') {
          try {
            resultObj[key] = getContract(
              address,
              abi,
              library,
              withSignerIfPossible && account ? account : undefined
            )
          } catch (error) {
            console.error('Failed to get contract', error)
          }
        }
      }
      return resultObj

    }
  }, [
    addressObj, abi, library, withSignerIfPossible, account, chainId])
}

/**
 * @param {number} chainId the token is on
 * @param {Token} t token the token used
 * @param {boolean} withSignerIfPossible
 */
export function useGenericTokenContract(chainId, t, withSignerIfPossible) {
  return useGenericContract(chainId, t.addresses[chainId], ERC20_ABI, withSignerIfPossible)
}

/**
 * @param {Token} t token the token used
 * @param {boolean} withSignerIfPossible
 */
export function useTokenContract(t, withSignerIfPossible) {
  const { address } = useTokenInfo(t)

  return useContract(address, ERC20_ABI, withSignerIfPossible)
}


/**
 * @param {Token[]} tokens
 * @param {boolean} withSignerIfPossible
 */
export function useTokenContracts(tokens, withSignerIfPossible) {
  const { chainId } = useActiveWeb3React()
  let tokenAddressObj = {}

  for (const t of tokens) {
    tokenAddressObj[t.symbol] = t.addresses[chainId]
  }

  const tokenContracts = useContracts(tokenAddressObj, ERC20_ABI, withSignerIfPossible)

  return useMemo(() => tokenContracts, [chainId, tokens])
}



export function useSwapDepositContract(poolName) {
  const { swapDepositAddress, swapAddress, swapEthAddress, isMeta } = usePoolTokenInfo(poolName)
  let address
  let abi
  if (swapEthAddress) {
    address = swapEthAddress
    abi = SWAP_ETH_WRAPPER_ABI
  } else if (isMeta) {
    address = swapDepositAddress
    abi = META_SWAP_DEPOSIT_ABI
  } else {
    address = swapAddress
    abi = SWAP_ABI
  }

  const swapContract = useContract(address, abi)


  return useMemo(() => swapContract, [poolName])
}


export function useSwapContract(poolName) {
  const { swapAddress } = usePoolTokenInfo(poolName)
  const swapContract = useContract(swapAddress, SWAP_ABI)

  return useMemo(() => swapContract, [poolName])
}

/**
 * @param {number} chainId the token is on
 * @param {Token} poolToken the token used
 */
export function useGenericSwapContract(chainId, poolToken) {
  const { swapAddresses, poolName } = poolToken ?? {}
  const swapContract = useGenericContract(chainId, swapAddresses?.[chainId], SWAP_ABI)

  return useMemo(() => swapContract, [poolName, chainId])
}


export function useMasterSwapContract(poolName) {
  const { swapAddress, isMeta } = usePoolTokenInfo(poolName)
  const abi = isMeta ? METASWAP_ABI : SWAP_ABI
  const swapContract = useContract(swapAddress, abi)
  return useMemo(() => swapContract, [poolName])
}

export function useComboSwapContract(poolName) {
  const { swapAddress, swapEthAddress, isMeta } = usePoolTokenInfo(poolName)

  let address
  let abi
  if (swapEthAddress) {
    address = swapEthAddress
    abi = SWAP_ETH_WRAPPER_ABI
  } else {
    address = swapAddress
    if (isMeta) {
      abi = METASWAP_ABI
    } else {
      abi = SWAP_ABI
    }
  }
  const swapContract = useContract(address, abi)
  return useMemo(() => swapContract, [poolName])
}


export function useGenericMasterSwapContract(chainId, poolName) {
  const { swapAddresses, isMeta } = POOL_NAME_TOKEN_MAP[chainId][poolName]
  const abi = isMeta ? METASWAP_ABI : SWAP_ABI
  const swapContract = useGenericContract(chainId, swapAddresses[chainId], abi)

  return useMemo(() => swapContract, [poolName, chainId])
}


export function useLPTokenContract(poolName) {
  // const { chainId } = useActiveWeb3React()
  const { address } = usePoolTokenInfo(poolName)
  const swapContract = useContract(address, LPTOKEN_ABI)
  return useMemo(() => swapContract, [poolName])
}
