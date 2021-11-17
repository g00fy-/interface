import { gql } from '@apollo/client'


export const POOL_QUERY = gql`
  query poolQuery($id: ID!) {
    pool(id: $id) {
      id
      pair
      allocPoint
      lastRewardBlock
      accSushiPerShare
      balance
      userCount
      owner {
        id
        sushiPerBlock
        totalAllocPoint
      }
      users(orderBy: amount, orderDirection: desc) {
        id
        address
        amount
        rewardDebt
      }
      slpAge
      liquidityPair @client
      timestamp
      entryUSD
      exitUSD
    }
  }
`