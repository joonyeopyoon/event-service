import { model, Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

enum WidgetRuleType {
  PEOPLE_COUNT = "PEOPLE_COUNT",
  QUEUE_MANAGEMENT = "QUEUE_MANAGEMENT",
  HEATMAP = "HEATMAP",
  SLIP_AND_FALL = "SLIP_AND_FALL",
}

const widgetRuleSchema = new Schema<any>(
  {
    deviceId: { type: Schema.Types.ObjectId, required: true },
    ruleName: { type: String, required: true },
    channel: { type: Number, required: true },
    type: { type: String, enum: WidgetRuleType, required: true },
  },
  { _id: false }
);

const widgetSchema = new Schema<any>(
  {
    title: {
      type: String,
      required: true,
    },
    rules: { type: [widgetRuleSchema] },
  },
  {
    timestamps: true,
    virtuals: {
      widgetId: {
        get() {
          return this._id;
        },
      },
    },
    versionKey: false,
  }
);

widgetSchema.plugin(mongooseLeanVirtuals);
export const WidgetModel = model<any>("Widget", widgetSchema);
