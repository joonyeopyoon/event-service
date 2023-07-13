import { model, Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

const slipAndFallSchema = new Schema<any>(
  {
    widgetId: { type: Schema.Types.ObjectId, required: true, index: true },
    deviceId: { type: Schema.Types.ObjectId, required: true, index: true },
    channel: { type: Number, required: true },
    ruleName: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    date: { type: Date },
  },
  {
    timestamps: true,
    virtuals: {
      slipAndFallId: {
        get() {
          return this._id;
        },
      },
    },
    versionKey: false,
  }
);

slipAndFallSchema.plugin(mongooseLeanVirtuals);
export const SlipAndFallModel = model<any>("SlipAndFall", slipAndFallSchema);
