import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { SAY_HI } from './graphql/gql';

// components
import Map from './components/Map';
import Sidebar from './components/Sidebar';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Container className="App">
      <Map />
      <Sidebar />
    </Container>
  );
}

export default App;
