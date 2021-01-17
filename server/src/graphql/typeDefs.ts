import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    getRoutes: MapData
  }

  type Mutation {
    addShipment(pickupLocation: [Float]!, dropoffLocation: [Float]!, description: String!): MapData
  }

  type Status {
    success: Boolean
  }

  type Shipment {
    id: String
    pickupLocation: [Float]
    dropoffLocation: [Float]
    description: String
  }

  type Route {
    id: String
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