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
module.exports = { getMarketPlants };
