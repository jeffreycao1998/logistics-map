import { gql } from "@apollo/client"
  
const SAY_HI = gql`
  query {
    sayHi {
      success
    }
  }
`

export default SAY_HI;