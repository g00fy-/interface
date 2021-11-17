import _ from 'lodash'
import { useMemo } from "react"

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { APOLLO_CACHE } from "./cache"
import { APOLLO_LINK } from "./link"

export { gql, useQuery, useLazyQuery } from '@apollo/client'

export { ApolloProvider } from '@apollo/client/react'


// const GRAPHQL_ENDPOINT =
//   'https://morning-springs-99941.herokuapp.com/https://graphql.bitquery.io'

// export const APOLLO_CLIENT = new ApolloClient({
//   uri: GRAPHQL_ENDPOINT,
//   cache: APOLLO_CACHE,
//   headers: {
//     'X-API-KEY': 'BQYs2j1gwycexAmnD214TMh4pP3vvKQv',
//   },
// })






function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    connectToDevTools:
      typeof window !== "undefined" && process.NODE_ENV === "development",
    cache: APOLLO_CACHE,
    link: APOLLO_LINK,

  })
}




export const APOLLO_CLIENT = createApolloClient()




let apolloClient
export function getApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Combine
    const data = _.merge(initialState, existingCache)

    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(
    () => getApollo(initialState),
    [initialState]
  )
  return store
}