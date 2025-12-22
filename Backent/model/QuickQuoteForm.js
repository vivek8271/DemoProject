import mongoose from "mongoose";

const QuickQuoteSchema = new mongoose.Schema({
  name: String,
  mobile_no: String,
  email: String,
  product: String,
  quantity: String,
  address: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.QuickQuoteForm ||
  mongoose.model("QuickQuoteForm", QuickQuoteSchema);

