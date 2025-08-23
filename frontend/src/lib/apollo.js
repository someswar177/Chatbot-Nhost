import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { nhost } from './nhost'

const HASURA_HTTP = import.meta.env.VITE_HASURA_HTTP
const HASURA_WS = import.meta.env.VITE_HASURA_WS

const httpLink = createHttpLink({
  uri: HASURA_HTTP,
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: HASURA_WS,
    connectionParams: () => ({
      headers: {
        Authorization: `Bearer ${nhost.auth.getAccessToken()}`,
      },
    }),
  })
)

const authLink = setContext((_, { headers }) => {
  const token = nhost.auth.getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
  },
})
