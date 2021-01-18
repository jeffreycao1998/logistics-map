require('dotenv').config();
import shortid from 'shortid';
import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import calcOptimalRoute from '../../util/calcOptimalRoute';

const createShipment = async (_obj: {}, args: ShipmentType, _context: {}) => {
  const { pickupLocation, dropoffLocation, description } = args;

  const identicalRoute = shipments.filter((shipment: ShipmentType) => {
    return shipment.pickupLocation[0] === pickupLocation[0] &&
      shipment.pickupLocation[1] === pickupLocation[1] &&
      shipment.dropoffLocation[0] === dropoffLocation[0] &&
      shipment.dropoffLocation[1] === dropoffLocation[1];
  }).length > 0;

  if (identicalRoute) {
    throw new Error('This route already exists on the map.')
  }

  shipments.push({
    id: `shipment-${shortid.generate()}`,
    pickupLocation,
    dropoffLocation,
    description
  });

  const routes = await calcOptimalRoute(shipments);

  return {
    shipments,
    routes,
  };
};

export default createShipment;