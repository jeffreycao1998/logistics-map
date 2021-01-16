require('dotenv');
import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { ShipmentType } from './types';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
});

export const shipments = [
  // {
  //   pickupLocation: [ 123, 123 ],
  //   dropoffLocation: [ 321, 321 ],
  //   description: 'asdas'
  // }
] as Array<ShipmentType>;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});