var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var User = require('../models/user').User

const bookingSchema = new Schema(
    {
        tourguy:{
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        regUser:{
                type: Schema.Types.ObjectId,
                ref:'User'
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model('Booking',bookingSchema);

