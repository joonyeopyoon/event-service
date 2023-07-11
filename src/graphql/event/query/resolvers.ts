import { messages } from "../../../model";

const resolvers: {
  Query: any;
} = {
  Query: {
    deviceEvents: async () => {
      return messages;
    },
  },
};

export default {
  resolvers,
};
