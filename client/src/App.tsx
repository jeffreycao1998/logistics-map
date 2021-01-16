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
  const [waypoints, setWaypoints] = useState([] as Waypoints);

  return (
    <Container className="App">
      <Map
        waypoints={waypoints}
        setWaypoints={setWaypoints}
      />
      <Sidebar
        waypoints={waypoints}
        setWaypoints={setWaypoints}
      />
    </Container>
  );
}

export default App;
