import { gql } from "@apollo/client"
  
const GET_ROUTES = gql`
  query {
    getRoutes {
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

export default GET_ROUTES;