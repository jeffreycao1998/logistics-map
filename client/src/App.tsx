import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShipmentType, RouteType } from './types';
import { useQuery } from '@apollo/client';
import { GET_ROUTES } from './graphql/gql';

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
  
  const { data } = useQuery(GET_ROUTES);

  useEffect(() => {
    if (data) {
      const { shipments, routes } = data.getRoutes;
      setShipments([...shipments]);
      setRoutes([...routes]);
    }
  },[data]);

  return (
    <Container className="App">
      <Sidebar
        shipments={shipments}
        setShipments={setShipments}
        setRoutes={setRoutes}
      />
      <Map
        shipments={shipments}
        routes={routes}
      />
    </Container>
  );
}

export default App;
