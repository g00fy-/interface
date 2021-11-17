import { Link, useHistory } from 'react-router-dom'

import { getCardStyleByPool } from '@styles/coins'

import { getPoolUrl } from '@urls'
import { INVERTED_ROUTER_INDEX } from '@constants/router'

import { POOLS_MAP } from '@hooks/pools/usePools'

import { useGenericPoolData } from '@hooks/pools/useGenericPoolData'
import { useChainSwitcher } from '@hooks/useChainSwitcher'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import Card from '@tw/Card'
import Grid from '@tw/Grid'

import ApyTooltip from '@components/ApyTooltip'

import StatDisplay from './StatDisplay'
import CoinLabels from './CoinLabels'

import { getPoolStats } from './getPoolStats'


export default function PoolsListCard({ poolName, chainId }) {
  const history = useHistory()
  const { chainId: activeChainId } = useActiveWeb3React()
  const [poolData] = useGenericPoolData(chainId, poolName)

  const triggerChainSwitch = useChainSwitcher()

  const poolTokens = POOLS_MAP[chainId][poolName]
  const poolRouterIndex = INVERTED_ROUTER_INDEX[chainId][poolName]


  const {
    apy,
    fullCompoundedApyStr,
    totalLockedUSDStr
  } = getPoolStats(poolData)


  return (
    <Link
      onClick={() => {
        if (chainId != activeChainId) {
          triggerChainSwitch(chainId)

          history.push(getPoolUrl({ poolRouterIndex }))
        }
      }}
      to={getPoolUrl({ poolRouterIndex })}
    >
      <Card
        title={poolName}
        className={`py-4 mt-4 items-center pr-2 ${getCardStyleByPool(poolName)} transition-all rounded-xl`}
        divider={false}
      >
        <Grid
          gap={3}
          cols={{ xs: 1, sm: 2 }}
          className='divide-x-0 sm:divide-x dark:divide-coolGray-800'
        >
          <div>
            <h3 className='text-sm text-gray-800 dark:text-coolGray-500'>
              Assets
            </h3>
            <CoinLabels coins={poolTokens} />
          </div>
          <div>
            <StatDisplay
              className="pr-8 lg:pr-12 xl:pr-14"
              title="Total Liquidity"
              content={
                <>
                  ${totalLockedUSDStr ?? <i className="opacity-50"> - </i>}
                </>
              }
            />

            <StatDisplay
              title="APY"
              infoTooltip={ fullCompoundedApyStr && <ApyTooltip apyData={apy} />}
              content={
                <>
                  {fullCompoundedApyStr ?? <i className="opacity-50"> - </i>}%
                </>
              }
            />
          </div>
        </Grid>
      </Card>
    </Link>
  )
}

