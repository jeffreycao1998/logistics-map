require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { ShipmentType } from './types';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
});

// export const shipments = [] as Array<ShipmentType>;
export const shipments = [
  {
    id: 'shipment-T3RCAwQOd',
    pickupLocation: [ -79.6248, 43.6777 ],
    dropoffLocation: [ -79.4521, 43.7254, 0 ],
    description: 'pearson to yorkdale'
  },
  {
    id: 'shipment-x26A-IOaO',
    pickupLocation: [ -79.1815, 43.8207, 1 ],
    dropoffLocation: [ -79.5395, 43.843, 2 ],
    description: 'zoo to wonderland'
  },
  // {
  //   id: 'shipment-HYacQ879f',
  //   pickupLocation: [ -79.3871, 43.6426, 3 ],
  //   dropoffLocation: [ -79.6423, 43.5931, 4 ],
  //   description: 'cn-tower to square one'
  // }
] as Array<ShipmentType>;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});