const mongoose = require("mongoose");
const { Schema } = mongoose;
const plantsSchema = new Schema({
  name: String,
  preferred_temperature: Number,
  preferred_moisture: Number,
  user_id: mongoose.Types.ObjectId,
  data: {
    soil: Number,
    water_level: Number,
    sunlight: Number,
  }
});
const devicesSchema = new Schema({
  name: String,
  user_id: mongoose.Types.ObjectId,
});
const usersSchema = new Schema({
  user_type: Number,
  name: String,
  email: String,
  password: String,
  phone_number: String,
  location: String,
  plants: [plantsSchema],
  Devices: [devicesSchema],
});

const model = mongoose.model("User", usersSchema);
module.exports = model;
