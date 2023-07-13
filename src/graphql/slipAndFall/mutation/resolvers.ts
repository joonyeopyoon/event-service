import { Types } from "mongoose";
import { SlipAndFallModel } from "@models";
import { pubsub, SLIP_AND_FALL } from "../../index";

const resolvers: {
  Mutation: any;
} = {
  Mutation: {
    postSlipAndFall: async (_: any, { body }: any) => {
      try {
        const slipAndFall = await SlipAndFallModel.create({
          ...body,
          widgetId: new Types.ObjectId(),
        });
        pubsub.publish(SLIP_AND_FALL, { newSlipAndFall: slipAndFall });
        return slipAndFall;
      } catch (error) {
        throw error;
      }
    },
    patchSlipAndFall: async (_: any, { slipAndFallId }: any) => {
      try {
        await SlipAndFallModel.findByIdAndUpdate(slipAndFallId, {
          confirmed: true,
        });
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default {
  resolvers,
};
