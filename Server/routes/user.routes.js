const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

router.get("/publicMarket", userController.publicMarket);
router.get("/personalMarket", userController.personalMarket);
router.post("/add", userController.addProduct);
router.put("/updateAddress", userController.updateAddress);
router.post("/saveMessage", userController.saveMessage);
router.get("/getMessages", userController.getUserMessages);
router.post("/answer", userController.answer);
router.post("/getPreferences", userController.getPreferences);
router.post("/updatePlants", userController.updatePlants);
router.post("/deleteProduct", userController.deleteProduct);
router.post("/editProduct", userController.editProduct);
router.post("/search", userController.searchProducts);

module.exports = router;
