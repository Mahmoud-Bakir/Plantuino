const User = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: { $ne: 3 } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSellers = async (req, res) => {
  try {
    const users = await User.find({ userType: 1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getPlantOwners = async (req, res) => {
  try {
    const users = await User.find({ userType: 0 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { getUsers, getSellers, getPlantOwners };
