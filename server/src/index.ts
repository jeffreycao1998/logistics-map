require('dotenv').config();
import { ShipmentType } from './types';
import server from './graphql/apolloServer';

export const shipments = [] as Array<ShipmentType>;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});