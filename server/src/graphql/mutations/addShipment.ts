import { shipments } from '../../index';
import { Shipment, Route } from '../../types';

const addShipment = async (_obj: {}, args: Shipment, _context: {}) => {
  const { pickupLocation, dropoffLocation, description } = args;

  console.log(shipments);

  shipments.push({
    pickupLocation,
    dropoffLocation,
    description
  });

  const routes: Array<Route> = [
    {
      type: 'pickup',
      geojsonCoordinates: [[123,123]]
    }
  ];

  return {
    shipments,
    routes,
  };
};

export default addShipment;