import React, { useState } from 'react';
import styled from 'styled-components';
import { ShipmentType, RouteType } from './types';
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
  const [shipments, setShipments] = useState([] as Array<ShipmentType>)
  const [routes, setRoutes] = useState([] as Array<RouteType>)

  return (
    <Container className="App">
      <Map
        shipments={shipments}
        routes={routes}
      />
      <Sidebar
        shipments={shipments}
        setShipments={setShipments}
        setRoutes={setRoutes}
      />
    </Container>
  );
}

export default App;
