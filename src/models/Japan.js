import mongoose from "mongoose";

const japanSchema = new mongoose.Schema({
    id: {type: String},
    kangi: {type: String},
    mean: {type: String},
    yomikata: {type: String},
    createdAt: {type: Date, required: true, default: Date.now},
    // undoc: {type: String},
    // hundoc: {type: String},
    // level: {type: String},
});

const Japan = mongoose.model("Japan", japanSchema);

export default Japan;
