const mongoose = require("mongoose");
const { Schema } = mongoose;
const productsSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: Buffer,
  userId: mongoose.Types.ObjectId,
  userPhoneNumber: String,
  country: String,
  city: String,
  street: String,
});
const plantsSchema = new Schema({
  name: String,
  minTemp: Number,
  maxTemp: Number,
  minMoisture: Number,
  maxMoisture: Number,
  user_id: mongoose.Types.ObjectId,
  data: {
    moisture: Number,
    waterLevel: Number,
    sunlight: Number,
    time: Date,
  },
});
const devicesSchema = new Schema({
  name: String,
  user_id: mongoose.Types.ObjectId,
});
const messagesSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  messageType: String,
  messageContent: String,
  timestamp: { type: Date, default: Date.now },
});
const usersSchema = new Schema({
  userType: Number,
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  street: { type: String, default: "" },
  located: { type: Boolean, default: false },
  plants: [plantsSchema],
  devices: [devicesSchema],
  products: [productsSchema],
  messages:[messagesSchema]
});

const model = mongoose.model("User", usersSchema);
module.exports = model;
