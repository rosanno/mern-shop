import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orders: { type: Object, required: true },
});

export default mongoose.model("Orders", ordersSchema);
