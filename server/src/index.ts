require('dotenv').config();
import { ShipmentType } from './types';
import server from './graphql/apolloServer';

export const startTime = (new Date).getTime();

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
  {
    id: 'shipment-HYacQ879f',
    pickupLocation: [ -79.3871, 43.6426, 3 ],
    dropoffLocation: [ -79.6423, 43.5931, 4 ],
    description: 'cn-tower to square one'
  },
  {
    id: 'shipment-HYacQIOaO',
    pickupLocation: [ -79.3197, 43.8124, 5 ],
    dropoffLocation: [ -79.2795, 43.7887, 6 ],
    description: 'dr norman bethuen to agincourt'
  },
  {
    id: 'shipment-HYa532523',
    pickupLocation: [ -79.3948, 43.6677, 7 ],
    dropoffLocation: [ -79.3788, 43.6214, 8 ],
    description: 'ROM to Toronto Island'
  },
  {
    id: 'shipment-123123',
    pickupLocation: [ -79.4094, 43.6780, 9 ],
    dropoffLocation: [ -79.3925, 43.6536, 10 ],
    description: 'Casa Loma to AGO'
  },
  // {
  //   id: 'shipment-234234',
  //   pickupLocation: [ -79.3860, 43.6424, 11 ],
  //   dropoffLocation: [ -79.3957, 43.6629, 12 ],
  //   description: 'Ripleys Aquariam to UofT'
  // },
  // {
  //   id: 'shipment-345345',
  //   pickupLocation: [ -79.3788, 43.6577, 13 ],
  //   dropoffLocation: [ -79.5019, 43.7735, 14 ],
  //   description: 'Ryerson Uni to York Uni'
  // },
  // {
  //   id: 'shipment-456456',
  //   pickupLocation: [ -79.4111, 43.6761, 15 ],
  //   dropoffLocation: [ -79.3496, 43.7955, 16 ],
  //   description: 'George Brown College to Seneca College'
  // },
  // {
  //   id: 'shipment-567567',
  //   pickupLocation: [ -79.2264, 43.7854, 17 ],
  //   dropoffLocation: [ -79.1938, 43.7907, 18 ],
  //   description: 'Centennial College to Toronto Pan Am Sports Centre'
  // },
] as Array<ShipmentType>;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});