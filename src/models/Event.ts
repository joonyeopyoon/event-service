import { model, Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

const eventSchema = new Schema<any>(
  {
    widgetId: { type: Schema.Types.ObjectId, required: true, index: true },
    deviceId: { type: Schema.Types.ObjectId, required: true, index: true },
    channel: { type: Number, required: true },
    ruleName: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    date: { type: Date },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    virtuals: {
      eventId: {
        get() {
          return this._id;
        },
      },
    },
    versionKey: false,
  }
);

eventSchema.plugin(mongooseLeanVirtuals);
export const EventModel = model<any>("Event", eventSchema);
