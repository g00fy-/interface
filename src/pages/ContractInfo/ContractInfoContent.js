import { CONTRACT_INFO } from '@constants/contractInfo'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import Card from '@tw/Card'
import Grid from '@tw/Grid'

import ContractListItem from './ContractListItem'


export default function ContractInfoContent() {
  const { chainId } = useActiveWeb3React()
  const specificContractInfo = CONTRACT_INFO[chainId]

  return (
    <Grid cols={{ xs: 1 }} gap={6}>
      <ContractGroupCard
        title='Tokens'
        tokens={[
          ...specificContractInfo.OPERATIONAL,
          ...specificContractInfo.LP_TOKENS,
          ...specificContractInfo.SWAP_TOKENS,
        ]}
      />
      <ContractGroupCard
        title='USD Stablecoins'
        tokens={specificContractInfo.STABLES}
      />
      <ContractGroupCard
        title='Tokens'
        tokens={specificContractInfo.TOKENS.filter(i => i.addresses[chainId] ?? false)}
      />
    </Grid>
  )
}

function ContractGroupCard({ title, tokens }) {
  if (tokens.length > 0) {
    return (
      <Card title={title} className="!pb-2">
        <ul className='divide-y divide-gray-200 dark:divide-coolGray-900'>
          {
            tokens.map(token => {
              return (
                <ContractListItem key={token.symbol} token={token} />
              )
            })
          }
        </ul>
      </Card>
    )
  } else {
    return null
  }

}
