import { shipments } from '../../index';

import createMatrix from '../../util/createMatrix';
import calcOptimalSequence from '../../util/calcOptimalSequence';
import joinRoutes from '../../util/joinRoutes';
import addSequenceNumber from '../../util/addSequenceNumber';

const getRoutes = async (_obj: {}, _args: {}, _context: {}) => {
  const startingPoint = 0;

  const matrix = await createMatrix(shipments);
  const optimalSequence = calcOptimalSequence(shipments, matrix, startingPoint);
  const routes = joinRoutes(matrix, optimalSequence);
  addSequenceNumber(shipments, optimalSequence, 0);
  
  return { shipments, routes };
};

export default getRoutes;