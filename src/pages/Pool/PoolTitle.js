import { POOLS_MAP } from '@hooks/pools/usePools'

export default function PoolTitle({ poolName, poolChainId }) {
  const coins = POOLS_MAP[poolChainId]?.[poolName]

  return (
    <div className='inline-flex items-center'>
      <h3 className='text-2xl text-default dark:text-coolGray-400 mr-2'>
        {poolName}
      </h3>
      {
        coins.map(coin =>
          <img
            key={coin.symbol}
            className='relative -mr-4 inline-block text-white shadow-solid w-8'
            src={coin.icon}
          />
        )
      }
    </div>
  )
}