import { CONTRACT_INFO } from '@constants/contractInfo'

import {
  STAKE_PATH,
  BRIDGE_PATH,
  getPoolUrl,
} from '@urls'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import Grid from '@tw/Grid'
import Card from '@tw/Card'

import PortfolioListItem from './PortfolioListItem'




export default function PortfolioContent() {
  const { chainId } = useActiveWeb3React()

  const poolItemProps = {
    stakeLinkTo: STAKE_PATH,
    getBalanceLinkToUrl: getPoolUrl,
    getTitleLinkTo: getPoolUrl,
  }


  return (
    <Grid cols={{ xs: 1 }} gap={6}>
      <PortfolioCard
        title='SYN Balances'
        tokens={CONTRACT_INFO[chainId].OPERATIONAL}
      />
      <PortfolioCard
        title='Pool Balances'
        tokens={CONTRACT_INFO[chainId].SWAP_TOKENS}
        itemProps={poolItemProps}
      />
      <PortfolioCard
        title='Stables Balances'
        tokens={CONTRACT_INFO[chainId].STABLES}
      />
      <PortfolioCard
        title='Balances'
        tokens={CONTRACT_INFO[chainId].TOKENS}
      />
    </Grid>
  )
}


function PortfolioCard({title, tokens, itemProps }) {
  if (tokens.length > 0) {
    return (
      <PortfolioGroupCard title={title}>
        {
          tokens.map(token =>
            <PortfolioListItem
              key={token.symbol}
              token={token}
              {...itemProps}
            />
          )
        }
      </PortfolioGroupCard>
    )
  } else {
    return <></>

  }

}

function PortfolioGroupCard({ title, children }) {
  return (
    <Card title={title} className="!pb-2.5">
      <ul className='divide-y divide-gray-200 dark:divide-coolGray-700'>
        {children}
      </ul>
    </Card>
  )
}
