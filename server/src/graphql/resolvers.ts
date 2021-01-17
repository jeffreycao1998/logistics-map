// Queries
import getRoutes from './queries/getRoutes';

// Mutations
import createShipment from './mutations/createShipment';
import deleteShipment from './mutations/deleteShipment';

const resolvers = {
  Query: {
    getRoutes,
  },
  Mutation: {
    createShipment,
    deleteShipment,
  }
}

export default resolvers;