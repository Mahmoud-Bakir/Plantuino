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

  const { password: hashedPassword,plants,devices,messages,products, ...userInfo } = user.toJSON();
  const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.JWT_SECRET);

  console.log(userInfo);
  res.send({
    token,
    user: userInfo,
    success: "success",
  });
};

const register = async (req, res) => {
  console.log(req.body);
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    ...req.body,
    password: hashedPassword,
  });

  user.save();

  res.send({ user });
  console.log(user);
};

module.exports = { login, register };
