require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { ShipmentType } from './types';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
});

export const shipments = [] as Array<ShipmentType>;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});