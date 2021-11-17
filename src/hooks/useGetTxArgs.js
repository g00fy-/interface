import { getGasPrice } from '@utils/gas'
import { parseUnits } from '@ethersproject/units'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

/**
 * gets the common tx args requiref for submitting txns including
 * things like slippage, deadline, gas price etc...
 */
export function useGetTxArgs() {
  // const { chainId } = useActiveWeb3React()

  return function getTxArgs(opts) {

    // const { gasPriceSelected } = opts ?? {}
    // let gasPrice = await getGasPrice(gasPriceSelected, chainId)
    // gasPrice = parseUnits(String(gasPrice) || '45', 9)
    return {
      slippageCustom:            null,
      slippageSelected:          'ONE_TENTH',
      infiniteApproval:          true,
      transactionDeadline:       getTimeMinutesFromNow(10),   // the time on samechain when a swap expires
      bridgeTransactionDeadline: getTimeMinutesFromNow(60 * 24),   // the time on crosschain when a swap expires
      // gasPrice:                  gasPrice
    }
  }
}


function getTimeMinutesFromNow(minutesFromNow) {
  const currentTimeSeconds = new Date().getTime() / 1000

  return Math.round(
    currentTimeSeconds + 60 * minutesFromNow
  )
}