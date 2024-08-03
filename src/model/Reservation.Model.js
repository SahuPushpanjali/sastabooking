const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        rel : "userd",
        required : true
    },

    adventureId : {
        type : mongoose.Schema.Types.ObjectId,
        rel : "adventures",
        required : true
    },

    slot : {                                         //slot is array of string
        type : {
            date : {
                type : Date,
                required : true
            },
            numberOfPerson : {
                type : Number,
                required : true
            }
        },
        required : true
    },

    createdAt : {
        type : String,
        required : true,
        default : new Date()
    },

    payment : {
        type : {
            status : {
                type : Boolean,
                required : true
            },
            mode : {
                type : String,
                enum : [ "cash", "upi", "credit_card","debit_card", "internet_banking" ],
                required : true
            },
            amount : {
                type : Number,
                required : true
            }

        },
        required : true
    }
})

const ReservationModel = mongoose.model("reservation", ReservationSchema)

module.exports =  ReservationModel;
