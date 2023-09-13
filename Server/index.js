const express = require("express");
require("dotenv").config();
const mongooseConnect = require("./configs/mongoDB.connect");
const app = express();

app.listen(8000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("server running on port: ", 8000);
  mongooseConnect();
});
