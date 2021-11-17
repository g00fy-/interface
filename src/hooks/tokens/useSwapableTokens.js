import { useActiveWeb3React } from '@hooks/useActiveWeb3React'




import { reduceNestedTokensIntoDict } from '@hooks/tokens/funcs'

import { SWAPABLE_TOKENS } from '@constants/tokens/swap'


const SWAPABLE_TOKENS_MAP = reduceNestedTokensIntoDict(SWAPABLE_TOKENS)




export function useSwapableTokensMap() {
  const { chainId } = useActiveWeb3React()

  return SWAPABLE_TOKENS_MAP[chainId] ?? {}
}