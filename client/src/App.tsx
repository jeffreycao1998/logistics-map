import React, { useState } from 'react';
import styled from 'styled-components';
import { Waypoints } from './types';
// import { useQuery } from '@apollo/client';
// import { SAY_HI } from './graphql/gql';

// components
import Map from './components/Map';
import Sidebar from './components/Sidebar';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

function App() {
  const [shipments, setShipments] = useState([
    {
      pickup: {
        lng: '-79.340424',
        lat: '43.795712',
      },
      dropoff: {
        lng: '-79.1815',
        lat: '43.8207'
      },
      description: 'my house to toronto zoo'
    },
    {
      pickup: {
        lng: '-79.5395',
        lat: '43.8430'
      },
      dropoff: {
        lng: '-79.3871',
        lat: '43.6426',
      },
      description: 'wonderland to pacific mall'
    },
  ])

  return (
    <Container className="App">
      <Map
        shipments={shipments}
        setShipments={setShipments}
      />
      <Sidebar
        shipments={shipments}
        setShipments={setShipments}
      />
    </Container>
  );
}

export default App;
