import { Link } from 'react-router-dom'


import { useTokenBalance } from '@hooks/tokens/useTokenBalances'
import { useTokenInfo } from '@hooks/tokens/useTokenInfo'


import Grid from '@tw/Grid'

import BalanceSection from './BalanceSection'
import StakedBalanceSection from './StakedBalanceSection'


export default function PortfolioListItem({ token, stakeLinkTo, getBalanceLinkToUrl, getTitleLinkTo }) {
  const tokenBalance = useTokenBalance(token)

  const { symbol, poolTokens, poolId=-1 } = useTokenInfo(token)


  const balanceLinkTo = getBalanceLinkToUrl?.({token})

  let iconDisplay
  if (poolTokens && poolTokens.length > 0) {
    iconDisplay = (
      <div className='inline-block ml-2 '>
        {poolTokens.map((coin) => (
          <img
            key={coin.symbol}
            src={coin.icon}
            className='relative -ml-2 inline-block text-white shadow-solid w-5 h-5 -mt-1'
          />
        ))}
      </div>
    )
  } else {
    iconDisplay =
      <img
        src={token.icon}
        className="w-5 h-5 inline mr-2 -mt-1"
      />
  }
  const symbolContent = (
    <span className='text-md font-medium mr-2'>
      {symbol}
    </span>
  )

  let symbolDisplay
  if (getTitleLinkTo) {
    const titleLinkClassName = "text-gray-900 dark:text-coolGray-400 hover:text-blue-500"
    const titleHref = getTitleLinkTo({ token })
    if (titleHref[0] == '/') {
      symbolDisplay =(
        <Link to={titleHref} className={titleLinkClassName}>
          {symbolContent}
        </Link>
      )
    } else {
      symbolDisplay = (
        <a href={titleHref} className={titleLinkClassName} target="_blank">
          {symbolContent}
        </a>
      )
    }
  } else {
    symbolDisplay = (
      <span className="text-gray-900 dark:text-coolGray-400 ">
        {symbolContent}
      </span>
    )
  }


  return (
    <li className='ml-auto py-2'>
      <Grid gap={2} cols={{xs: 1, sm: 2}}>
        <div className='self-center'>
          <div>
            {symbolDisplay}
            {iconDisplay}
          </div>
          <div>
            <small className="text-gray-400 dark:text-coolGray-500">
              {token.name}
            </small>
          </div>
        </div>
        <div className='h-full w-full self-center'>
          <div>
            <BalanceSection
              label="Total Balance"
              balance={tokenBalance}
              token={token}
              linkTo={balanceLinkTo}
            />
            {(poolId > -1) &&
              <StakedBalanceSection
                poolId={poolId}
                token={token}
                stakeLinkTo={stakeLinkTo}
              />
            }
          </div>
        </div>
      </Grid>
    </li>
  )
}



