import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Styled Components
const GlobalStyle = createGlobalStyle`
  body, html {
    background-color: #f4f4f2;
    width: 100%;
    font-family: 'Inter', 'sans-serif';
    overflow: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: rgb(32, 34, 35);
  }
`;

// GraphQL
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    {/* @ts-ignore */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);