const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");


router.get("/market", userController.getMarketPlants)
router.post("/add", userController.addProduct)




module.exports = router;