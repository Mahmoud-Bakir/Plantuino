const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");


router.get("/market", userController.getMarketPlants)



module.exports = router;