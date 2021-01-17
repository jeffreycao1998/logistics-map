import { gql } from "@apollo/client"
  
const ADD_SHIPMENT = gql`
  mutation createShipment($pickupLocation: [Float]!, $dropoffLocation: [Float]!, $description: String!) {
    createShipment(pickupLocation: $pickupLocation, dropoffLocation: $dropoffLocation, description: $description) {
      shipments {
        id
        pickupLocation
        dropoffLocation
        description
      }
      routes {
        id
        type
        sequence
        geojsonCoordinates
      }
    }
  }
`

export default ADD_SHIPMENT;