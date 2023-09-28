
require('dotenv').config(); 
const db_url = process.env.DB_URL;
const mongoose = require("mongoose")
const connectionsParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
const mongooseConnect = ()=>{ 
mongoose.connect(db_url , connectionsParams)
.then(()=>{
    console.info("connected")
})
.catch((err)=>{
    console.log("Error",err)
})
}

module.exports = mongooseConnect