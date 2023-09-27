const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controllers");

router.get("/getUsers", adminController.getUsers);
router.get("/getSellers", adminController.getSellers);
router.get("/getPlantOwners", adminController.getPlantOwners);
router.post("/delete", adminController.deleteUser);



module.exports = router;
