
import { SWAP_POOL_TOKENS } from '@constants/tokens/tokenGroups'
import { BASIC_TOKENS_BY_CHAIN } from '@constants/tokens/basic'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useTokenContracts } from '@hooks/contracts/useContract'
import { useMemo } from 'react'


export function useAllContracts() {
  const { chainId } = useActiveWeb3React()

  const tokenArr = [
    ...SWAP_POOL_TOKENS[chainId],
    ...BASIC_TOKENS_BY_CHAIN[chainId],
  ]

  const allTokenContracts = useTokenContracts(tokenArr)

  return useMemo(() => allTokenContracts, [chainId]) // previously wasnt doing memo here
}
