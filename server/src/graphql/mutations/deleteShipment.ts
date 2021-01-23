import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import calcOptimalSequence from '../../util/calcOptimalSequence';

type Args = {
  shipmentId: string
}

const deleteShipment = async (_obj: {}, args: Args, _context: {}) => {
  const { shipmentId } = args;

  const removeShipment = shipments.filter((shipment: ShipmentType) => {
    return shipment.id === shipmentId;
  })[0];

  const removeIndex = shipments.indexOf(removeShipment);
  shipments.splice(removeIndex, 1);

  // reset sequence
  shipments.forEach((shipment: ShipmentType) => {
    shipment.pickupLocation.splice(2, 1);
    shipment.dropoffLocation.splice(2, 1);
  });

  const optimalSequence = await calcOptimalSequence(shipments);
  console.log(optimalSequence);
  // return {
  //   shipments,
  //   routes
  // };
};

export default deleteShipment;