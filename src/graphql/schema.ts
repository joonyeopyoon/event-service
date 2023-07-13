import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input SlipAndFallCriteria {
    widgetId: ID
    deviceId: ID
    confirmed: Boolean
  }

  input SlipAndFallInput {
    deviceId: ID!
    channel: Int
    ruleName: String!
    date: String
  }

  type SlipAndFall {
    slipAndFallId: ID!
    widgetId: ID!
    deviceId: ID!
    channel: Int
    ruleName: String!
    confirmed: Boolean!
    date: String
  }

  type Query {
    slipAndFall(slipAndFallId: ID!): SlipAndFall!
    slipAndFalls(
      criteria: SlipAndFallCriteria
      sortProperty: String
      offset: Int
      limit: Int
    ): [SlipAndFall!]!
  }

  type Mutation {
    postSlipAndFall(body: SlipAndFallInput): SlipAndFall
    patchSlipAndFall(slipAndFallId: ID!): Boolean!
  }

  type Subscription {
    newSlipAndFall: SlipAndFall!
  }
`;
