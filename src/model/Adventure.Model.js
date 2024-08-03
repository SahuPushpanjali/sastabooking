const mongoose = require('mongoose');

const AdventureSchema = new mongoose.Schema({

    cityId : {
        type : mongoose.Schema.Types.ObjectId,
        rel : "cities",
        required : true
    },

    name : {
        type : String,
        required : true
    },

    category : {
        type : [String]
    },

    image : {
        type : [String],
        required : true
    },

    duration : {
        type : Number,
        required : true
    },

    pricePerHead : {
        type : Number,
        required : true
    },

    currency : {
        type : String,
        default : "INR"
    }
})

const AdventureModel = mongoose.model("adventures", AdventureSchema);

module.exports = AdventureModel;