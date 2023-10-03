const User = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: { $ne: 3 } }).select('-products -plants');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSellers = async (req, res) => {
  try {
    const sellers = await User.find({ userType: 1 }).select('-products -plants');
    res.json(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPlantOwners = async (req, res) => {
  try {
    const plantOwners = await User.find({ userType: 0 }).select('-products -plants');
    res.json(plantOwners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteAllUsers = async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany({});
    if (!deletedUsers || deletedUsers.deletedCount === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.json({ message: "All users deleted successfully", deletedUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getSellers, getPlantOwners, deleteUser,deleteAllUsers };
