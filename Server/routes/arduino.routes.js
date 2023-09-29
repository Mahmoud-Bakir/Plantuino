const express = require('express');
const router = express.Router();
const arduinoController = require('../controllers/arduino.controllers');

router.post('/sendData', arduinoController.sendData);
router.get('/deleteData', arduinoController.deleteAllData);
router.get('/getData', arduinoController.getData);


module.exports = router;
