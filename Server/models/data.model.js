const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema({
    moisture: Number,
    sunlight: Number,
},
{timestamps:true}
);
const model = mongoose.model("Data", dataSchema);
module.exports = model;