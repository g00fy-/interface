import { commify } from '@ethersproject/units'

import { formatBNToString } from '@bignumber/format'

export function getPoolStats(poolData) {

  const { apy, totalLockedUSD } = poolData ?? {}

  let fullCompoundedApyStr
  let totalLockedUSDStr

  if (poolData) {
    try {
      if ((0 < apy?.fullCompoundedAPY) && (apy?.fullCompoundedAPY < Number.MAX_SAFE_INTEGER)) {
        fullCompoundedApyStr = apy?.fullCompoundedAPY
      }
      if (totalLockedUSD) {
        totalLockedUSDStr = commify(formatBNToString(totalLockedUSD, 18, 0))
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return {
    apy,
    totalLockedUSD,
    fullCompoundedApyStr,
    totalLockedUSDStr
  }
}