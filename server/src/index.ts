require('dotenv');
import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
});

export const shipments = [
  {
    pickupLocation: [ 123, 123 ],
    dropoffLocation: [ 321, 321 ],
    description: 'asdas'
  }
];

export const routes = [

];

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});