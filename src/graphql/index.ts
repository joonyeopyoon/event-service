import { Subjects } from "@shared";
import { typeDefs } from "./schema";
import { PubSub } from "graphql-subscriptions";
import countQuery from "./slipAndFall/query/resolvers";
import countMutation from "./slipAndFall/mutation/resolvers";
import countSubscription from "./slipAndFall/subscription/resolvers";

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
