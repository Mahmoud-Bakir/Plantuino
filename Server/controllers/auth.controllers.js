const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const login = async (req, res) => {
  console.log(req.body);
  const { email: login, password } = req.body;
  const user = await User.findOne({ email: login });
  if (!user)
    return res.status(404).send({ message: "email/password incorrect" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res.status(404).send({ message: "email/password incorrect" });

  const { password: hashedPassword,devices,messages,products, ...userInfo } = user.toJSON();
  const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.JWT_SECRET);

  console.log(userInfo);
  res.send({
    token,
    user: userInfo,
    success: "success",
  });
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { login, register };
