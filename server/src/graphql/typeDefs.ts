import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    sayHi: Status
  }

  type Mutation {
    addShipment(pickupLocation: [Float]!, dropoffLocation: [Float]!, description: String!): MapData
  }

  type Status {
    success: Boolean
  }

  type Shipment {
    pickupLocation: [Float]
    dropoffLocation: [Float]
    description: String
  }

  type Route {
    type: String
    sequence: Int
    geojsonCoordinates: [[Float]]
  }

  type MapData {
    shipments: [Shipment]
    routes: [Route]
  }
`;

export default typeDefs;