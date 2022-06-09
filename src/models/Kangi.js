import mongoose from "mongoose";

const kangiSchema = new mongoose.Schema({
    id: {type: String},
    kangi: {type: String},
    mean: {type: String},
    undoc: {type: String},
    hundoc: {type: String},
    level: {type: String},
    createdAt: {type: Date, required: true, default: Date.now},
});

const Kangi = mongoose.model("Kangi", kangiSchema);

export default Kangi;
