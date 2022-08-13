import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  id: { type: String },
  kangi: { type: String },
  mean: { type: String },
  undoc: { type: String },
  hundoc: { type: String },
  level: { type: String },
  firstWord: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Word = mongoose.model("Word", WordSchema);

export default Word;
