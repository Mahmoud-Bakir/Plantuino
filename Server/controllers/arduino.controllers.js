    const sendData = (req, res) => {
      const data = req.body;
      console.log('Received data from Arduino:', data);
      res.json({ receivedData: data });
    }
  
  module.exports = {sendData};
  