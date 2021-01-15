import React from 'react';
import { useQuery } from '@apollo/client';
import { SAY_HI } from './graphql/gql';

function App() {
  const { data } = useQuery(SAY_HI);

  console.log(data);
  return (
    <div className="App">
      Hi, my names jeff
    </div>
  );
}

export default App;
