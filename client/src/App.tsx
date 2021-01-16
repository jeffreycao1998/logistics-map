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
  // const [waypoints, setWaypoints] = useState([] as Waypoints);
  const [waypoints, setWaypoints] = useState([
    [-122.48369693756104,37.83381888486939],
    [-122.49378204345702,37.83368330777276]
  ] as Waypoints);
  const [shipments, setShipments] = useState([
    {
      id: '135792468',
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
    {
      id: '123456789',
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
