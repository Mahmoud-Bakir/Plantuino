const User = require("../models/user.model");
const axios = require("axios");

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
    const { name, price, imageUrl } = req.body;
    const id = req.user._id;
    const user = await User.findById(id);
    const userPhoneNumber = user.phoneNumber;
    const country = user.country;
    const city = user.city;
    const street = user.street;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newProduct = {
      name,
      price,
      imageUrl,
      userId: id,
      userPhoneNumber,
      country,
      city,
      street,
    };

    user.products.push(newProduct);
    await user.save();
    const products = user.products;

    res.json({
      message: "Product added successfully",
      newProduct,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { country, city, street } = req.body;
    const id = req.user._id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.country = country;
    user.city = city;
    user.street = street;
    user.located = true;

    await user.save();

    res.json({ message: "Address updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const saveMessage = async (req, res) => {
  try {
    const { messageType, messageContent } = req.body;
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newMessage = {
      userId: id,
      messageType,
      messageContent,
    };

    user.messages.push(newMessage);
    await user.save();

    res.json({ message: "Message saved successfully", newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const messages = user.messages;
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const generateText = async (prompt) => {
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const requestBody = {
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100
  };

  try {
    console.log(requestBody.prompt)
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log("response", response.data.choices[0].text);
    const answer = response.data.choices[0].text.replace(/^(\?\n|\n)+/g, '');
    return answer;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};



module.exports = {
  addProduct,
  publicMarket,
  personalMarket,
  updateAddress,
  saveMessage,
  getUserMessages,
};
