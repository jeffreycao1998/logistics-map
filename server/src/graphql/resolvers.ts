// Queries
import getRoutes from './queries/getRoutes';

// Mutations
import addShipment from './mutations/addShipment';

const resolvers = {
  Query: {
    getRoutes,
  },
  Mutation: {
    addShipment,
  }
}

export default resolvers;