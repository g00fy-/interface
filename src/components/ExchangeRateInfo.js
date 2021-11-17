import { BigNumber } from '@ethersproject/bignumber'

import { formatBNToPercentString, formatBNToString } from '@bignumber/format'

import { ChainId, CHAIN_INFO_MAP, CHAIN_PARAMS } from '@constants/networks'

import { getCoinTextColorDark, getCoinTextColorAlt } from '@styles/coins'
import { getNetworkTextColor, getNetworkCurrencyColor } from '@styles/networks'

import Grid from '@tw/Grid'
import Col from '@tw/Col'



export default function ExchangeRateInfo({
  fromCoin,
  toCoin,
  exchangeRate,
  feeAmount,
  gasDropAmount,
  fromChainId,
  toChainId,
}) {
  const formattedExchangeRate = formatBNToString(exchangeRate, 18, 4)

  // the below is actually retarded
  const numExchangeRate = Number(formattedExchangeRate)
  const isPriceImpactNegative = numExchangeRate < 1

  const slippage = exchangeRate.sub(BigNumber.from(10).pow(18))
  const formattedPercentSlippage = formatBNToPercentString(slippage, 18)

  let bgColor
  if (numExchangeRate > 1.03 ) {
    bgColor = 'bg-teal-50'
  } else if (numExchangeRate > 0.97) {
    bgColor = 'bg-coolGray-50'
  } else if (numExchangeRate > 0.9) {
    bgColor = 'bg-amber-50'
  } else if (numExchangeRate > 0) {
    bgColor = 'bg-red-50'
  } else {
    bgColor = 'bg-coolGray-50'
  }

  let textColor
  if (numExchangeRate >= 1) {
    textColor = 'text-green-500'
  } else if (numExchangeRate > 0.975) {
    textColor = 'text-amber-600'
  } else {
    textColor = 'text-red-500'
  }


  const isGasDropped = gasDropAmount > 0

  return (
    <>
      <hr className='dark:hidden' />
      <div className={`py-3.5 pr-6 pl-6 rounded-b-2xl ${bgColor} dark:bg-coolGray-700 transition-all`}>
        <Grid cols={{ xs: 1, sm: 2 }} gapY={3} className={exchangeRate.eq(0) && 'pb-2'}>
          {feeAmount &&
            <FeeInfoLabel
              isFull={!isGasDropped}
              feeAmount={feeAmount}
              gasDropAmount={gasDropAmount}
              toCoin={toCoin}
              toChainId={toChainId}
            />
          }
          {isGasDropped &&
            <GasDropLabel
              gasDropAmount={gasDropAmount}
              toChainId={toChainId}
            />
          }
          { !exchangeRate.eq(0) &&
            <>
              <div className='text-center sm:text-left'>
                <p className='text-sm font-medium bg-opacity-70 pb-0.5 dark:text-coolGray-400'>
                  Price per
                  {" "}
                  <span className={getCoinTextColorDark(fromCoin)}>
                    {fromCoin.symbol}
                  </span>

                  {fromChainId && <ChainInfoLabel chainId={fromChainId} />}
                </p>
                <span className='text-lg sm:text-2xl font-mono font-medium dark:text-coolGray-300'>
                  {formattedExchangeRate}
                </span>
                <span className={`pl-2 text-lg font-mono font-medium ${getCoinTextColorDark(toCoin)}`}>
                  {toCoin.symbol}
                </span>
                {toChainId && <ChainInfoLabel chainId={toChainId} className="pl-1" />}
              </div>
              <div className='text-center sm:text-right cursor-pointer'>
                <p className=' text-sm font-medium opacity-70 pb-1.5 dark:text-coolGray-300'>
                  {!isPriceImpactNegative && 'Positive '}
                  Slippage
                </p>
                <span
                  className={`
                    pl-2 text-lg font-medium ml-auto
                    ${textColor}
                  `} // ${isPriceImpactNegative ? 'text-red-500' : 'text-green-500'}
                >
                  {formattedPercentSlippage}
                </span>
              </div>
            </>
          }
        </Grid>
      </div>
    </>
  )
}


function FeeInfoLabel({ feeAmount, isFull, toCoin, toChainId }) {
  let decimalsToDisplay
  if (toCoin.swapableType == "ETH") {
    decimalsToDisplay = 3
  } else {
    decimalsToDisplay = 0
  }

  const formattedFee = formatBNToString(feeAmount, 18, decimalsToDisplay)

  return (
    <Col xs="full" sm={isFull ? "full" : 1}>
      <div className='text-center sm:text-left -mb-2' /*-mb-4 */ >
        <p className='text-sm font-light bg-opacity-70 dark:text-coolGray-400'>
          <span className="dark:text-coolGray-300 font-medium">
            {formattedFee}
          </span>
          {" "}
          <span className={`${getCoinTextColorAlt(toCoin)} font-medium`}>
            {toCoin.symbol}
          </span>
          {" Transaction Fee on "}
          <span className="font-normal">
            <ChainInfoLabel chainId={toChainId} prefixText="" />
          </span>
        </p>
      </div>
    </Col>
  )
}


function GasDropLabel({ gasDropAmount, toChainId }) {
  let decimalsToDisplay
  if (toChainId == ChainId.AVALANCHE) {
    decimalsToDisplay = 2
  } else if (toChainId == ChainId.BSC) {
    decimalsToDisplay = 3
  } else {
    decimalsToDisplay = 4
  }

  const formattedGasDropAmount = formatBNToString(gasDropAmount, 18, decimalsToDisplay)


  return (
    <Col xs={1}>
      <div className='text-center sm:text-right -mb-2' /*-mb-4 */ >
        <p className='text-sm font-light bg-opacity-70 dark:text-coolGray-400'>
          <span className="dark:text-coolGray-400">
            {"Will receive "}
          </span>
          <span className="dark:text-coolGray-300 font-medium">
            {formattedGasDropAmount}
          </span>
          {" "}
          <span className={`${getNetworkCurrencyColor(toChainId)} font-medium`}>
            {CHAIN_PARAMS[toChainId].nativeCurrency.symbol}
          </span>
        </p>
      </div>
    </Col>
  )
}


function ChainInfoLabel({ chainId, className, prefixText }) {
  const { chainName, chainSymbol } = CHAIN_INFO_MAP[chainId]

  return (
    <span className={`text-sm dark:text-coolGray-400 opacity-90 ${className}`}>
      {prefixText ?? " on "}
      <span className={getNetworkTextColor(chainId)}>
        {chainName.length > 10 ? chainSymbol : chainName}
      </span>
    </span>
  )
}