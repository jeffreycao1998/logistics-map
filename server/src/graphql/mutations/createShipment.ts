import shortid from 'shortid';
import { shipments } from '../../index';
import { ShipmentType } from '../../types';

import checkDuplicateShipment from '../../util/checkDuplicateShipment';
import createMatrix from '../../util/createMatrix';
import calcOptimalSequence from '../../util/calcOptimalSequence';
import joinRoutes from '../../util/joinRoutes';
import addSequenceNumber from '../../util/addSequenceNumber';

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

  const startingPoint = 0;

  const matrix = await createMatrix(shipments);
  const optimalSequence = calcOptimalSequence(shipments, matrix, startingPoint);
  const routes = joinRoutes(matrix, optimalSequence);
  addSequenceNumber(shipments, optimalSequence, 0);
  
  return { shipments, routes };
};

export default createShipment;