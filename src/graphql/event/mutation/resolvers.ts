import { messages } from "../../../model";
import { created } from "../../../message/publishers";
import { pubsub, SLIP_AND_FALL } from "../../index";

const resolvers: {
  Mutation: any;
} = {
  Mutation: {
    postDeviceEvent: async (_: any, { content }: any) => {
      try {
        const id = messages.length.toString();
        const message = { id, content };
        messages.push(message);

        await created(_, message);
        pubsub.publish(SLIP_AND_FALL, { newDeviceEvent: message });

        return id;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default {
  resolvers,
};
