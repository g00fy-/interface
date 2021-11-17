import { CHAIN_INFO_MAP } from '@constants/networks'

import { SELECTABLE_POOLS_BY_CHAIN } from '@constants/tokens/poolsByChain'
import { getNetworkTextColor } from '@utils/styles/networks'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'

import PoolsListCard from './PoolsListCard'


export default function PoolsPage() {
  const { chainId } = useActiveWeb3React()

  return (
    <PageWrapper>
      <StandardPageContainer title='Pools'>
        <PoolsOnChain chainId={chainId} poolsArr={SELECTABLE_POOLS_BY_CHAIN[chainId]} />
        {
          _.entries(SELECTABLE_POOLS_BY_CHAIN)
            .filter(([otherChainId, poolsArr]) => otherChainId != chainId)
            .map( ([otherChainId, poolsArr]) =>
              <PoolsOnChain chainId={otherChainId} poolsArr={poolsArr}/>
            )
        }
      </StandardPageContainer>
    </PageWrapper>
  )
}



function PoolsOnChain({ chainId, poolsArr }) {
  const { chainName, chainImg } = CHAIN_INFO_MAP[chainId]

  return (
    <>
      <div className={`text-lg ${getNetworkTextColor(chainId)}  pt-6`}>
        <img
          src={chainImg}
          className={`
            w-5 h-5 rounded-md
            mr-2 opacity-80 inline
          `}
        />
        {chainName}
      </div>
      <div className="space-x-4">
      {
        poolsArr.map(pt => {
          return (
            <PoolsListCard key={pt.poolName} poolName={pt.poolName} chainId={chainId} />
          )
        })
      }
      </div>
    </>
  )
}