import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import ErrorModal from '../src/components/ErrorModal'

const httpLink = new HttpLink({ uri: process.env.GRAPHQL_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });
  return forward(operation);
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    let allMessages = ''
    graphQLErrors.forEach(({ message, locations, path }) =>
      allMessages += message
    )
    // Show <ErrorModal/> if there is a graphql error in the network layer
    ErrorModal.show(allMessages)
  }
    

  if (networkError) ErrorModal.show(networkError)
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink, errorLink),
  cache: new InMemoryCache()
});