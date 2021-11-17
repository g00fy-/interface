import { STAKING_MAP_TOKENS } from '@constants/tokens/staking'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'





export function useStakingToken(poolName) {
  const { chainId } = useActiveWeb3React()
  return STAKING_MAP_TOKENS[chainId][poolName] ?? {}
}