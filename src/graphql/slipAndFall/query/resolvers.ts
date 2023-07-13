import { SlipAndFallModel } from "@models";

const resolvers: {
  Query: any;
} = {
  Query: {
    slipAndFall: async (_: any, { slipAndFallId }: any) => {
      return await SlipAndFallModel.findById(slipAndFallId);
    },
    slipAndFalls: async (
      _: any,
      { criteria, sortProperty, offset = 0, limit = 10 }: any
    ) => {
      return await SlipAndFallModel.find({ ...criteria })
        .sort({ [sortProperty]: -1 })
        .skip(offset)
        .limit(limit);
    },
  },
};

export default {
  resolvers,
};
