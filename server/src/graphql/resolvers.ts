// Queries
import getRoutes from './queries/getRoutes';

// Mutations
import createShipment from './mutations/createShipment';
import deleteShipment from './mutations/deleteShipment';
import editShipment from './mutations/editShipment';

const resolvers = {
  Query: {
    getRoutes,
  },
  Mutation: {
    createShipment,
    deleteShipment,
    editShipment,
  }
}

export default resolvers;