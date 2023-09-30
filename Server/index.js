const express = require("express");
require("dotenv").config();
const PORT=3000
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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


app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server running on port:", PORT);
  mongooseConnect();
});
