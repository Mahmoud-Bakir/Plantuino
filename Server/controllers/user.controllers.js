const User = require("../models/user.model");

const getMarketPlants = async (req, res) => {
  const users = await User.find();
  const plants = [];
  for (const user of users) {
    if (user.products.length > 0) {
      plants.push(...user.products);
    }
  }

  res.send(plants);
};
const addProduct = async (req, res) => {
  try {
    const { name, price, location, imageUrl, _id } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.products.push({
      name,
      price,
      location,
      imageUrl,
      user_id: _id,
    });
    await user.save();
    const updatedUser = await User.findById(_id);
    const products = updatedUser.products;
    res.json({
      message: "Product added successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { getMarketPlants, addProduct };
