require('dotenv').config();
import shortid from 'shortid';
import { shipments } from '../../index';
import { ShipmentType } from '../../types';
import calcOptimalRoute from '../../util/calcOptimalRoute';

const addShipment = async (_obj: {}, args: ShipmentType, _context: {}) => {
  const { pickupLocation, dropoffLocation, description } = args;

  shipments.push({
    id: `shipment-${shortid.generate()}`,
    pickupLocation,
    dropoffLocation,
    description
  });

  const routes = calcOptimalRoute(shipments);

  return {
    shipments,
    routes,
  };
};

export default addShipment;