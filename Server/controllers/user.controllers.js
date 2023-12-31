const User = require("../models/user.model");
const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

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
    const { name, price, image } = req.body;
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
      image,
      userId: id,
      userPhoneNumber,
      country,
      city,
      street,
    };

    console.log(newProduct);

    user.products.push(newProduct);
    await user.save();
    const products = user.products;

    res.json({
      message: "Product added successfully",
      newProduct: {
        ...newProduct,
        _id: user.products[user.products.length - 1]._id,
      },
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
const updatePlants = async (req, res) => {
  try {
    const { maxLight, maxMoisture, minLight, minMoisture, plantName, image } =
      req.body;
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPlant = {
      plantName,
      maxLight,
      maxMoisture,
      minLight,
      minMoisture,
      image,
    };
    user.plants.push(newPlant);
    await user.save();
    res.json({ message: "plants updated successfully", user });
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
    const lastMessage = await User.findById(id).select({
      messages: { $slice: -1 },
    });

    console.log(lastMessage);

    res.json({
      message: "Message saved successfully",
      newMessage: lastMessage.messages[0],
    });
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
  const apiKey = process.env.API_KEY;
  const apiUrl = "https://api.openai.com/v1/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const requestBody = {
    model: "text-davinci-003",
    prompt,
    max_tokens: 100,
  };
  try {
    console.log(requestBody.prompt);
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log("response", response.data.choices[0].text);
    const answer = response.data.choices[0].text.replace(/^(\?\n|\n)+/g, "");
    return answer;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const generatePreference = async (prompt) => {
  const apiKey = process.env.API_KEY;
  const apiUrl = "https://api.openai.com/v1/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  console.log(prompt);

  const preparedPrompt = {
    description: `Generate the JSON object with minimum and maximum light and moisture requirements for a ${prompt}`,
    instructions: "The values should be of type integer.",
    example: {
      minLight: 50,
      maxLight: 70,
      minMoisture: 30,
      maxMoisture: 70,
    },
  };

  const requestBody = {
    model: "text-davinci-003",
    prompt: JSON.stringify(preparedPrompt),
    max_tokens: 100,
  };

  try {
    console.log(requestBody.prompt);
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log("response", response.data.choices[0].text);

    const resultString = response.data.choices[0].text;
    const resultJSON = JSON.parse(resultString);

    const combinedResult = {
      plantName: prompt,
      ...resultJSON,
    };
    console.log(combinedResult);
    return combinedResult;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const answer = async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const generatedText = await generateText(prompt);
    res.json({ result: generatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPreferences = async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const generatedResponse = await generatePreference(prompt);
    res.json({ result: generatedResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.user._id;
    const productId = req.body.productId;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "products._id": productId },
      { $pull: { products: { _id: productId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Product not found or does not belong to the user" });
    }
    res.json({ message: "Product deleted successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const editProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, newEdition } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "products._id": productId },
      { $set: { "products.$": newEdition } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Product not found or does not belong to the user" });
    }
    res.json({ message: "Product Edited successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchProducts = async (req, res) => {
  const { searchCriteria } = req.body;
  try {
    const allUsers = await User.find({}, "products");
    const allProducts = allUsers.reduce((acc, user) => {
      return [...acc, ...user.products];
    }, []);

    const matchingProducts = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchCriteria.toLowerCase());
    });

    res.json(matchingProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addProduct,
  publicMarket,
  personalMarket,
  updateAddress,
  saveMessage,
  getUserMessages,
  answer,
  getPreferences,
  updatePlants,
  deleteProduct,
  editProduct,
  searchProducts,
};
