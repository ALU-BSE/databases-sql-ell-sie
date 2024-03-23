import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    description: String,
    price: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
  });
  
export const Product = mongoose.model('Product', productSchema);
