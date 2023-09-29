const express = require('express');
const router = express.Router();
const arduinoController = require('../controllers/arduino.controllers');

router.post('/data', arduinoController.sendData);
router.post('/deleteData', arduinoController.deleteAllData);


module.exports = router;
