import { Link } from 'react-router-dom'

import { commify } from '@ethersproject/units'

import { formatBnMagic } from '@bignumber/format'

import { useTokenInfo } from '@hooks/tokens/useTokenInfo'

import Grid from '@tw/Grid'



export default function BalanceSection({label, balance, token, overrideSymbol, linkTo}) {

  const labelContent = (
    <small >
      {label}
      {' '}
    </small>
  )

  let labelDisplay
  if (linkTo) {
    labelDisplay = (
      <Link to={linkTo} className="hover:underline hover:text-gray-600">
        {labelContent}
      </Link>
    )
  } else {
    labelDisplay = labelContent
  }


  return (
    <Grid gap={2} cols={{xs:2}}>
      <div className="text-right text-gray-400">
        {labelDisplay}
      </div>
      <div>
        <small >
          <FancyBalance token={token} balance={balance}/>
          { (balance != 0) &&
            <i className="text-gray-400 text-md">
              {" "}
              {overrideSymbol ?? token.symbol}
            </i>
          }
        </small>
      </div>
    </Grid>
  )
}

function FancyBalance({ token, balance }) {
  const tokenInfo = useTokenInfo(token)
  const formattedBalance = commify(formatBnMagic(balance, tokenInfo, 8))
  const arr = formattedBalance.split(".")
  const integerStr = arr[0]
  const decimalStr = arr[1]

  return (
    <>
      <span
        className={
          (integerStr == "0") ? "text-gray-700 dark:text-coolGray-400" : "text-gray-800 dark:text-coolGray-300"
        }
      >
        {integerStr}
        .
      </span>
      <span
        className={
          (decimalStr == "0") ? "text-gray-700 dark:text-coolGray-400" : "text-gray-800 dark:text-coolGray-300 text-xs"
        }
      >
        {decimalStr}
      </span>
    </>
  )
}