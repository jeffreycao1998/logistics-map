import shortid from 'shortid';
import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import checkDuplicateShipment from '../../util/checkDuplicateShipment';
import calcOptimalRoute from '../../util/calcOptimalRoute';

const createShipment = async (_obj: {}, args: ShipmentType, _context: {}) => {
  const { pickupLocation, dropoffLocation, description } = args;

  const identicalRoute = checkDuplicateShipment(shipments, args);

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
  console.log(shipments);
  return {
    shipments,
    routes,
  };
};

export default createShipment;