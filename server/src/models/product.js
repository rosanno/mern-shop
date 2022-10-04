import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    specification: [Array],
    slug: { type: String, slug: "title" },
    bgColor: [String],
    color: [String],
    img: { type: Array, required: true },
    price: { type: Number, required: true },
    category: { type: Array },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
