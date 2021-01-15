import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    sayHi: Message
  }

  type Message {
    message: String!
  }
`;

export default typeDefs;