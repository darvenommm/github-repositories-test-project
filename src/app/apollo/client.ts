import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: __GITHUB_URL__,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${__GITHUB_TOKEN__}`,
  },
});
