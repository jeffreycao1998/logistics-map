import { shipments } from '../../index';
import { ShipmentType } from '../../types';

import checkDuplicateShipment from '../../util/checkDuplicateShipment';
import createMatrix from '../../util/createMatrix';
import calcOptimalSequence from '../../util/calcOptimalSequence';
import joinRoutes from '../../util/joinRoutes';
import addSequenceNumber from '../../util/addSequenceNumber';

interface Args extends ShipmentType {
  shipmentId: string
}

const editShipment = async (_obj: {}, args: Args, _context: {}) => {
  const { pickupLocation, dropoffLocation, description, shipmentId } = args;

  const selectedShipment = shipments.filter((shipment: ShipmentType) => {
    return shipment.id === shipmentId;
  })[0];
  
  const identicalRoute = checkDuplicateShipment(shipments, args);

  if (identicalRoute) {
    throw new Error('This route already exists on the map.')
  }

  const shipmentCopy = { ...selectedShipment };

  // update shipment with new data
  selectedShipment.pickupLocation = pickupLocation;
  selectedShipment.dropoffLocation = dropoffLocation;
  selectedShipment.description= description;

  const startingPoint = 0;

  try {
    const matrix = await createMatrix(shipments);
    const optimalSequence = calcOptimalSequence(shipments, matrix, startingPoint);
    const routes = joinRoutes(matrix, optimalSequence);
    addSequenceNumber(shipments, optimalSequence, 0);
    
    return { shipments, routes };
  } catch(err) {
    selectedShipment.pickupLocation = shipmentCopy.pickupLocation;
    selectedShipment.dropoffLocation = shipmentCopy.dropoffLocation;
    selectedShipment.description= shipmentCopy.description;
    
    throw new Error(err.message);
  }
};

export default editShipment;