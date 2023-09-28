const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.static("public"));

app.use(express.json());
const mongooseConnect = require("./configs/mongoDB.connect");
const authMiddleware = require("./middlewares/auth.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");

const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const arduinoRouter = require('./routes/arduino.routes');


app.use("/auth", authRouter);
app.use("/users", authMiddleware, usersRouter);
app.use("/admin", adminMiddleware, adminRouter);
app.use('/arduino', arduinoRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server running on port:", PORT);
  mongooseConnect();
});
