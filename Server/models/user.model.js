const mongoose = require("mongoose");
const { Schema } = mongoose;
const productsSchema = new Schema({
  name: String,
  price:Number,
  location:String,
  imageUrl : String,
  user_id: mongoose.Types.ObjectId,
});
const plantsSchema = new Schema({
  name: String,
  minTemp:Number,
  maxTemp: Number,
  minMoisture: Number,
  maxMoisture: Number,
  user_id: mongoose.Types.ObjectId,
  data: {
    moisture: Number,
    waterLevel: Number,
    sunlight: Number,
    time:Date,
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
  devices: [devicesSchema],
  products: [productsSchema],
});

const model = mongoose.model("User", usersSchema);
module.exports = model;
