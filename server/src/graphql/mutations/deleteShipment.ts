import { shipments } from '../../index';
import { ShipmentType } from '../../types';

import createMatrix from '../../util/createMatrix';
import calcOptimalSequence from '../../util/calcOptimalSequence';
import joinRoutes from '../../util/joinRoutes';
import addSequenceNumber from '../../util/addSequenceNumber';

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
  
  if (shipments.length === 0) {
    return {
      shipments: [],
      routes: []
    };
  }

  const startingPoint = 0;

  const matrix = await createMatrix(shipments);
  const optimalSequence = calcOptimalSequence(shipments, matrix, startingPoint);
  const routes = joinRoutes(matrix, optimalSequence);
  addSequenceNumber(shipments, optimalSequence, 0);
  return { shipments, routes };
};

export default deleteShipment;