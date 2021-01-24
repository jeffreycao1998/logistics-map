require('dotenv').config();
import { ShipmentType } from './types';
import server from './graphql/apolloServer';
// import testShipments from './testing/testShipments';

export const shipments = [] as Array<ShipmentType>;
// export const shipments = testShipments as Array<ShipmentType>;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});