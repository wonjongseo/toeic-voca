import mongoose from "mongoose";

const RelatedWordSchema = new mongoose.Schema({
  id: { type: String },
  kangi: { type: String },
  mean: { type: String },
  yomikata: { type: String },
  firstWord: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});
const RelatedWord = mongoose.model("RelatedWord", RelatedWordSchema);

export default RelatedWord;
