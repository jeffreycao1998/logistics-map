import shortid from 'shortid';
import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import checkDuplicateShipment from '../../util/checkDuplicateShipment';
import calcOptimalSequence from '../../util/calcOptimalSequence';

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

  const optimalSequence = await calcOptimalSequence(shipments);
  console.log(optimalSequence);
  // return {
  //   shipments,
  //   routes,
  // };
};

export default createShipment;