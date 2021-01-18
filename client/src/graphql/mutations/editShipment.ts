import { gql } from "@apollo/client"
  
const EDIT_SHIPMENT = gql`
  mutation editShipment($pickupLocation: [Float]!, $dropoffLocation: [Float]!, $description: String!, $shipmentId: String!) {
    editShipment(pickupLocation: $pickupLocation, dropoffLocation: $dropoffLocation, description: $description, shipmentId: $shipmentId) {
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



export default EDIT_SHIPMENT;