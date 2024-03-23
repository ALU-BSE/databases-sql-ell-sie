import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    date: { type: Date, default: Date.now },
    quantity: Number
  });

export const Transaction = mongoose.model('Transaction', transactionsSchema);
