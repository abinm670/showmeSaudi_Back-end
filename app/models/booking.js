var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var tUser = require('../models/tourUser')
var rUser = require('../models/regUser')

const bookingSchema = new Schema(
    {
        tourGuy:{
            type: Schema.Types.ObjectId,
            ref:'tUser'
        },
        regUser:{
                type: Schema.Types.ObjectId,
                ref:'rUser'
        },
        date:{
            type:String,required: [true, "can't be blank"]
        }
    },
    {timestamps:true}
);

module.exports=mongoose.model('Booking',bookingSchema);

