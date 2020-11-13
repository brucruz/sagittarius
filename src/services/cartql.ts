import { ApolloClient, InMemoryCache } from '@apollo/client';

export const cartQl = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.cartql.com',
});
