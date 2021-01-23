import { shipments } from '../../index';
import matrix from '../../testing/testMatrixes/testMatrix6Shipments';

import calcOptimalSequence from '../../util/calcOptimalSequence';
import joinRoutes from '../../util/joinRoutes';
import addSequenceNumber from '../../util/addSequenceNumber';

const getRoutes = async (_obj: {}, _args: {}, _context: {}) => {
  const optimalSequence = calcOptimalSequence(shipments);
  const routes = joinRoutes(matrix, optimalSequence);
  addSequenceNumber(shipments, optimalSequence, 0);
  
  return { shipments, routes };
};

export default getRoutes;