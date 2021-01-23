require('dotenv').config();
import { ShipmentType } from './types';
import server from './graphql/apolloServer';

// export const shipments = [] as Array<ShipmentType>;
export const shipments = [
  {
    id: 'shipment-T3RCAwQOd',
    pickupLocation: [ -79.6248, 43.6777 ],
    dropoffLocation: [ -79.4521, 43.7254 ],
    description: 'pearson to yorkdale'
  },
  {
    id: 'shipment-x26A-IOaO',
    pickupLocation: [ -79.1815, 43.8207 ],
    dropoffLocation: [ -79.5395, 43.843 ],
    description: 'zoo to wonderland'
  },
  {
    id: 'shipment-HYacQ879f',
    pickupLocation: [ -79.3871, 43.6426 ],
    dropoffLocation: [ -79.6423, 43.5931 ],
    description: 'cn-tower to square one'
  },
  {
    id: 'shipment-HYacQIOaO',
    pickupLocation: [ -79.3197, 43.8124 ],
    dropoffLocation: [ -79.2795, 43.7887 ],
    description: 'dr norman bethuen to agincourt'
  },
  {
    id: 'shipment-HYa532523',
    pickupLocation: [ -79.3948, 43.6677 ],
    dropoffLocation: [ -79.3788, 43.6214 ],
    description: 'ROM to Toronto Island'
  },
  {
    id: 'shipment-123123',
    pickupLocation: [ -79.4094, 43.6780 ],
    dropoffLocation: [ -79.3925, 43.6536 ],
    description: 'Casa Loma to AGO'
  },
  // {
  //   id: 'shipment-234234',
  //   pickupLocation: [ -79.3860, 43.6424 ],
  //   dropoffLocation: [ -79.3957, 43.6629 ],
  //   description: 'Ripleys Aquariam to UofT'
  // },
  // {
  //   id: 'shipment-345345',
  //   pickupLocation: [ -79.3788, 43.6577 ],
  //   dropoffLocation: [ -79.5019, 43.7735 ],
  //   description: 'Ryerson Uni to York Uni'
  // },
  // {
  //   id: 'shipment-456456',
  //   pickupLocation: [ -79.4111, 43.6761 ],
  //   dropoffLocation: [ -79.3496, 43.7955 ],
  //   description: 'George Brown College to Seneca College'
  // },
  // {
  //   id: 'shipment-567567',
  //   pickupLocation: [ -79.2264, 43.7854 ],
  //   dropoffLocation: [ -79.1938, 43.7907 ],
  //   description: 'Centennial College to Toronto Pan Am Sports Centre'
  // },
] as Array<ShipmentType>;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});