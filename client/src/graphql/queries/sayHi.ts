import { gql } from "@apollo/client"
  
const SAY_HI = gql`
  query {
    sayHi {
      message
    }
  }
`

export default SAY_HI;