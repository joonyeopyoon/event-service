import { Subjects } from "@shared";
import { typeDefs } from "./schema";
import { PubSub } from "graphql-subscriptions";
import countQuery from "./event/query/resolvers";
import countMutation from "./event/mutation/resolvers";
import countSubscription from "./event/subscription/resolvers";

export const database: any = [];
export const pubsub = new PubSub();
export const SLIP_AND_FALL = Subjects.EventCreated;

export const graphqlSchema = {
  typeDefs,
  resolvers: {
    ...countQuery.resolvers,
    ...countMutation.resolvers,
    ...countSubscription.resolvers,
  },
};
