const User = require("../models/user.model");

const publicMarket = async (req, res) => {
  const users = await User.find();
  const plants = [];
  for (const user of users) {
    if (user.products.length > 0) {
      plants.push(...user.products);
    }
  }
  res.send(plants);
};
const personalMarket = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  const products = user.products;
  res.send(products);
};

const addProduct = async (req, res) => {
  try {
    const { name, price, location, imageUrl } = req.body;
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.products.push({
      name,
      price,
      location,
      imageUrl,
    });
    await user.save();
    const products = user.products;
    res.json({
      message: "Product added successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { addProduct, publicMarket, personalMarket };
