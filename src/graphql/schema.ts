import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type DeviceEvent {
    id: ID!
    content: String!
  }

  type Query {
    deviceEvents: [DeviceEvent!]!
  }

  type Mutation {
    postDeviceEvent(content: String!): ID!
  }

  type Subscription {
    newDeviceEvent: DeviceEvent!
  }
`;
