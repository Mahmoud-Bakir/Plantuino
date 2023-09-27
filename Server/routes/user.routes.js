const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

router.get("/publicMarket", userController.publicMarket);
router.get("/personalMarket", userController.personalMarket);
router.post("/add", userController.addProduct);
router.put("/updateAddress", userController.updateAddress);
router.post("/saveMessage", userController.saveMessage);
router.get("/getMessages", userController.getUserMessages);
router.post("/answer",userController.answer)



module.exports = router;
