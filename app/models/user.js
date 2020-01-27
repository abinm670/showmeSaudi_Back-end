var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

const Touring = require('./touring.js').touringSchema;
const commentsSchema = require('./comment.js');

// pointSchema
const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

 
var userSchema = new Schema(
    {
    usrGenInfo:
    {

        firstName:{type:String, required:true},
        lastName:{type:String, required:true},
        // email:{type:String, required:true}, 
        // password: passwordPrompt()
    } , 
    address: String, 
    phone: String,
    tour:{type:Boolean, default:false, required: true},
    touring:[Touring.obj],
    img:{type:String, required:true} 
    }
    , {timestamps:true}
)

//manipulate data with Models 
var User = mongoose.model("User", userSchema);

//Export Models
module.exports = User;
