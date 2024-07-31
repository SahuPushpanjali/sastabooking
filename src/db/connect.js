const mongoose = require('mongoose')

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then(()=>{    //it returns a promise the format is this :- mongoose.connect(MONGO_DB).then.catch(), then handel the success and error in then and catch
    console.log("MONGODB DATABASE Connected sucessfully!!")
}).catch((err)=>{
    console.error(err)

})