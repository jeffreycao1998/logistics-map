import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    sayHi: Status
  }

  type Mutation {
    addShipment(pickupLocation: [Int]!, dropoffLocation: [Int]!, description: String!): MapData
  }

  type Status {
    success: Boolean
  }

  type Shipment {
    pickupLocation: [Int]
    dropoffLocation: [Int]
    description: String
  }

  type Route {
    type: String
    geojsonCoordinates: [[Int]]
  }

  type MapData {
    shipments: [Shipment]
    routes: [Route]
  }
`;

export default typeDefs;