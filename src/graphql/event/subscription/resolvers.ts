import { pubsub, SLIP_AND_FALL } from "../../index";

const resolvers: {
  Subscription: any;
} = {
  Subscription: {
    newDeviceEvent: {
      subscribe: () => pubsub.asyncIterator(SLIP_AND_FALL),
    },
  },
};

export default {
  resolvers,
};
