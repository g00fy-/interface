import _ from 'lodash'
import { useEffect } from 'react'

import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { ChevronLeftIcon } from '@heroicons/react/outline'

import { STAKE_PATH, POOLS_PATH } from '@urls'

import { CHAIN_INFO_MAP } from '@constants/networks'
import { CHAINS_BY_POOL_NAME } from '@constants/tokens/poolsByChain'
import { ROUTER_INDEX } from '@constants/router'

import { getCardStyleByPool } from '@styles/coins'
import { getNetworkTextColor } from '@styles/networks'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { usePoolData } from '@hooks/pools/usePoolData'

import Card from '@tw/Card'
import Grid from '@tw/Grid'

import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'

import PoolInfoSection from './PoolInfoSection'
import PoolManagement from './PoolManagement'
import PoolTitle from './PoolTitle'
import MigratePools from './MigratePools'





export default function PoolPage({ match: { params: { id } } }) {

  const poolName = ROUTER_INDEX[id]


  const { chainId } = useActiveWeb3React()

  const poolChainId = CHAINS_BY_POOL_NAME[poolName]

  const isPoolOnChain = chainId == poolChainId

  useEffect(
    () => {
      if (!isPoolOnChain) {
        // history.push(POOLS_PATH)
        const { chainName } = CHAIN_INFO_MAP[chainId] ?? {}
        if (chainName) {
          toast(`Viewing pools on ${chainName}`)
        }
      }
    },
    [isPoolOnChain, chainId]
  )

  return (
    <PageWrapper>
      <StandardPageContainer
        title={
          <>
            <div>
              <Link
                to={POOLS_PATH}
                className='text-sm font-medium text-coolGray-500 hover:text-indigo-600'
              >
                <div className="text-lg inline-block">
                  Pools
                </div>
                <ChevronLeftIcon className='w-4 inline-block -mt-1 ml-2 transform-gpu rotate-180' />
              </Link>
            </div>
            <PoolTitle poolName={poolName} poolChainId={poolChainId} />
          </>
        }
      >
        {isPoolOnChain &&
          <PoolPageContents
            poolName={poolName}
            isPoolOnChain={isPoolOnChain}
          />
        }
        {!isPoolOnChain &&
          <Grid
            cols={{ xs: 1 }}
            gap={2}
          >
            <Card
              title="Pool Info "
              className={`
                my-8 transform transition-all duration-100 rounded-2xl place-self-center
                min-w-4/5 sm:min-w-3/4 md:min-w-3/5 lg:min-w-1/2
                ${getCardStyleByPool(poolName)}
              `}
              divider={false}
            >
              <div
                className={`
                  pt-4 dark:text-coolGray-400 w-full text-center
                `}
              >
                Switch to{' '}
                <span className={`${getNetworkTextColor(poolChainId)} font-medium`}>
                  {CHAIN_INFO_MAP[poolChainId].chainName}
                </span>
                {' '}
                to interact with the {poolName}
              </div>
            </Card>
          </Grid>
        }

      </StandardPageContainer>
    </PageWrapper>
  )
}



function PoolPageContents({ poolName, isPoolOnChain }) {
  const [poolData, userShareData] = usePoolData(poolName)
  const apyData = poolData?.apy ?? {}

  let fullyCompoundedApyLabel
  if (_.isFinite(apyData.fullCompoundedAPY)) {
    fullyCompoundedApyLabel = apyData.fullCompoundedAPY?.toFixed(2)
  } else {
    fullyCompoundedApyLabel =
      <i className="opacity-50"> - </i>
  }


  return (

        <Grid
          cols={{ xs: 1 }}
          gap={2}
        >
          <div>
            <MigratePools poolName={poolName}/>
          </div>
          <Card
            className={`
              my-8 transform transition-all duration-100 rounded-2xl place-self-center
              min-w-4/5 sm:min-w-3/4 md:min-w-3/5 lg:min-w-1/2
              ${getCardStyleByPool(poolName)}
            `}
            divider={false}
            title={
              <div className=' items-center'>
                <h2 className='text-lg text-default dark:text-coolGray-400 font-medium w-full'>
                  {poolName}
                  <span className='float-right'>
                    APY: {fullyCompoundedApyLabel}%
                  </span>
                </h2>
              </div>
            }
          >
            <div className='-mb-6'>
              {isPoolOnChain &&
                <PoolManagement
                  poolName={poolName}
                  poolStakingLink={STAKE_PATH}
                />
              }
            </div>
          </Card>
          <div>
            {isPoolOnChain &&
              <PoolInfoSection
                data={poolData}
                userData={userShareData}
              />
            }
          </div>
        </Grid>

  )
}

