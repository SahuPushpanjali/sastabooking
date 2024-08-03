const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema ({                 //we create schema for slots because it contains multiple collection that's why we make new nested schema for slots

    date :{
        type : Date,
        required : true
    },

    numberofPerson : {
        type : Number,
        required : true,
        default : 20
    }
})                    

const AdventureDeatailSchema = new mongoose.Schema({
    adventureId : {
        type : mongoose.Schema.Types.ObjectId,          //because it is mongodb's id
        rel : "adventures",
        require : true
    },

    subtitle : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true
    },

    openingHrs : {      //use joy library for 24hr format timing //we can validate schema
        type : String,
        default : "10:00",
        required : true
    },

    closingHrs : {
        type : String,
        default : "18:00",
        required : true
    },

    onlineBooking : {
        type : Boolean,
        default : true,
        required : true
    },
    
    slots : {
        type : [SlotSchema],    //array of slotschema
        required : true
    }
})

    
const AdventureDetailModel = mongoose.model("adventure_details", AdventureDeatailSchema )

module.exports = AdventureDetailModel