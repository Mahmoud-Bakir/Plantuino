const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");


// router.get("/publicMarket", userController.publicMarket)
router.get("/personalMarket", userController.personalMarket)
router.post("/add", userController.addProduct)




module.exports = router;