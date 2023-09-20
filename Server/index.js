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

app.listen(22, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("server running on port: ", 22);
  mongooseConnect();
});
