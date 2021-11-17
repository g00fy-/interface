import { STAKING_TOKENS } from '@constants/tokens/staking'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import Grid from '@tw/Grid'

import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'

import PoolStakeCard from './PoolStakeCard'



export default function Stake() {
  const { chainId } = useActiveWeb3React()

  const stakingTokens = STAKING_TOKENS[chainId]

  return (
    <PageWrapper>
      <StandardPageContainer title='Stake'>
        <Grid
          cols={{ xs: 1, sm: 1, md: 2 }}
          gap={6}
          className='mt-4'
        >
          {
            stakingTokens.map( token => (
              <PoolStakeCard key={token.symbol} token={token} />
            ))
          }
        </Grid>
      </StandardPageContainer>
    </PageWrapper>
  )
}
