// Queries
import getRoutes from './queries/getRoutes';

// Mutations
import createShipment from './mutations/createShipment';

const resolvers = {
  Query: {
    getRoutes,
  },
  Mutation: {
    createShipment,
  }
}

export default resolvers;