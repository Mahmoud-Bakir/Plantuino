const express = require("express");
require("dotenv").config();
const mongooseConnect = require("./configs/mongoDB.connect");
const app = express();

app.use(express.json());
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);
const authMiddleware = require("./middlewares/auth.middleware");

const usersRouter = require("./routes/user.routes");
app.use("/users", authMiddleware, usersRouter);

const PORT = process.env.PORT || 3000; // Use process.env.PORT if defined, otherwise use 3000

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server running on port:", PORT);
  mongooseConnect();
});
