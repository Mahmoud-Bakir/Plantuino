const mongoose = require("mongoose");
const { Schema } = mongoose;
const productsSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  userId: mongoose.Types.ObjectId,
  userPhoneNumber: String,
  country: String,
  city: String,
  street: String,
});
const plantsSchema = new Schema({
  image:String,
  plantName: String,
  minLight: Number,
  maxLight: Number,
  minMoisture: Number,
  maxMoisture: Number,
  user_id: mongoose.Types.ObjectId,
});
const devicesSchema = new Schema({
  name: String,
  user_id: mongoose.Types.ObjectId,
});
const messagesSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  messageType: String,
  messageContent: String,
},
{timestamps: true},
);
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
