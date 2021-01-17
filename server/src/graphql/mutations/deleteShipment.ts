require('dotenv').config();
import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import calcOptimalRoute from '../../util/calcOptimalRoute';

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

  const routes = calcOptimalRoute(shipments);

  return {
    shipments,
    routes
  };
};

export default deleteShipment;