var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

//Touring Schema
var regUserSchema = new Schema(
    {
    email: { type: String, lowercase: true, unique: [true, "this email taken"], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: { type: String, required: [true, "can't be blank"] },
    firstName: { type: String, required: [true, "can't be blank"] },
    lastName: { type: String, required: [true, "can't be blank"] },
    tourType: { type: String, default: "regUser" },
    address: {type: String, required:[true, "can't be blank"]},
    phone: String,
    // img: {type:String, required: [true, "should upload image"]},

    // userTyp:"regUser"
    // img: {type:String, required: [true, "should upload image"]},
          
    }, {timestamps:true}
)

var RegUser = mongoose.model("ReUser", regUserSchema ); 
//Export Models
module.exports = RegUser;
//module.exports = touringSchema;