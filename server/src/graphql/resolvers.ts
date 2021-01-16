// Queries
import sayHi from './queries/sayHi';

// Mutations
import addShipment from './mutations/addShipment';

const resolvers = {
  Query: {
    sayHi,
  },
  Mutation: {
    addShipment,
  }
}

export default resolvers;