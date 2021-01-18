require('dotenv');
import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import calcOptimalRoute from '../../util/calcOptimalRoute';

interface Args extends ShipmentType {
  shipmentId: string
}

const editShipment = async (_obj: {}, args: Args, _context: {}) => {
  const { pickupLocation, dropoffLocation, description, shipmentId } = args;

  const selectedShipment = shipments.filter((shipment: ShipmentType) => {
    return shipment.id === shipmentId;
  })[0];

  // update shipment with new data
  selectedShipment.pickupLocation = pickupLocation;
  selectedShipment.dropoffLocation = dropoffLocation;
  selectedShipment.description= description;

  const routes = await calcOptimalRoute(shipments);

  return {
    shipments,
    routes,
  };
};

export default editShipment;