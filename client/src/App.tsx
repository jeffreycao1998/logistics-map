import React from 'react';
import { useQuery } from '@apollo/client';
import { SAY_HI } from './graphql/gql';

// components
import Map from './components/Map';

function App() {
  
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
