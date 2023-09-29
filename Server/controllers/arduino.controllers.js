
const Data = require("../models/data.model");
  const sendData = async (req, res) => {
    const data = req.body;
    console.log('Received data from Arduino:', data);
    const newData = new Data({
      moisture: data.moisture_value,
      sunlight: data.ldr_value,
    });
    newData.save()
      .then(savedData => {
        console.log('Data saved to database:', savedData);
        res.json({ receivedData: data, savedData: savedData });
      })
      .catch(error => {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
  const deleteAllData = async (req, res) => {
    try {
      await Data.deleteMany({});
      res.json({ message: 'All data deleted successfully' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
module.exports = {sendData,deleteAllData};
