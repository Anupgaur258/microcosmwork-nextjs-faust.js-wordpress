// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:10003/graphql',
});

// Create client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Named export for getApolloClient function
export function getApolloClient() {
  return client;
}

// Default export bhi add kar do
export default client;