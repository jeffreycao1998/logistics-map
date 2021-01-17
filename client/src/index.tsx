import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './globalstyles';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// GraphQL
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);