import { gql } from "@apollo/client"
  
const DELETE_SHIPMENT = gql`
  mutation deleteShipment($shipmentId: String!) {
    deleteShipment(shipmentId: $shipmentId) {
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



export default DELETE_SHIPMENT;