import { gql } from "@apollo/client"
  
const ADD_SHIPMENT = gql`
  mutation addShipment($pickupLocation: [Float]!, $dropoffLocation: [Float]!, $description: String!) {
    addShipment(pickupLocation: $pickupLocation, dropoffLocation: $dropoffLocation, description: $description) {
      shipments {
        pickupLocation
        dropoffLocation
        description
      }
      routes {
        type
        geojsonCoordinates
      }
    }
  }
`

export default ADD_SHIPMENT;