require('dotenv');
import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import checkDuplicateShipment from '../../util/checkDuplicateShipment';
import calcOptimalSequence from '../../util/calcOptimalSequence';

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

  // update shipment with new data
  selectedShipment.pickupLocation = pickupLocation;
  selectedShipment.dropoffLocation = dropoffLocation;
  selectedShipment.description= description;

  const optimalSequence = await calcOptimalSequence(shipments);
  console.log(optimalSequence);
  // return {
  //   shipments,
  //   routes,
  // };
};

export default editShipment;