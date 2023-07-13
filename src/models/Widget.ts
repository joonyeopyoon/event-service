import { model, Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

export enum WidgetType {
  CUMULATE_PEOPLECOUNTS = "CUMULATE_PEOPLECOUNTS",
  STAYING_PEOPLECOUNTS = "STAYING_PEOPLECOUNTS",
  TYPE_PEOPLECOUNTS = "TYPE_PEOPLECOUNTS",
  ENTRY_EXIT_PEOPLECOUNTS = "ENTRY_EXIT_PEOPLECOUNTS",
  RANK_PEOPLECOUNTS = "RANK_PEOPLECOUNTS",
  AREA_TRAFFIC = "AREA_TRAFFIC",
  CHECKOUT_QUEUE = "CHECKOUT_QUEUE",
  NUMBER_OF_PEOPLE_BY_AREA = "NUMBER_OF_PEOPLE_BY_AREA",
  OPERATOR_MAP = "OPERATOR_MAP",
  COMMON_HEATMAP = "COMMON_HEATMAP",
  CUMULATIVE_SALES_POS = "CUMULATIVE_SALES_POS",
  REVENUE_PER_SALES_POS = "REVENUE_PER_SALES_POS",
  SALES_TRANSACTION_POS = "SALES_TRANSACTION_POS",
  RETAIL_MAP = "RETAIL_MAP",
  STATUS_OF_ENTER_EXIT = "STATUS_OF_ENTER_EXIT",
  FACTORY_MAP = "FACTORY_MAP",
  DOCK_MANAGEMENT = "DOCK_MANAGEMENT",
  VEHICLE_EXIT_MANAGEMENT = "VEHICLE_EXIT_MANAGEMENT",
  ILLEGAL_PARKING = "ILLEGAL_PARKING",
  CITY_MAP = "CITY_MAP",
}

enum WidgetRuleType {
  PEOPLE_COUNT = "PEOPLE_COUNT",
  QUEUE_MANAGEMENT = "QUEUE_MANAGEMENT",
  HEATMAP = "HEATMAP",
  SLIP_AND_FALL = "SLIP_AND_FALL",
}

enum WidgetStyleType {
  BASIC = "BASIC",
  MAIN = "MAIN",
  EXPANSION = "EXPANSION",
  MAP = "MAP",
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
    type: { type: String, enum: WidgetType, required: true },
    styleType: { type: String, enum: WidgetStyleType, required: true },
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
