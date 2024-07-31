const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    cuisines : {
        type : [String]   //array of string
    }
})


const CityModel = mongoose.model("cities" ,CitySchema);   //mongoose.model("CollectionName" , Schema)

module.exports = CityModel;                  //now model is created



