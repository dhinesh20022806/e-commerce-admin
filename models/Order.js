import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean,
    created_at: Date,
  },
  {
    timestamps: true,
  },
);

export const Order = models?.Order || model("Order", OrderSchema);
