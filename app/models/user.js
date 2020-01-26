var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
//Comments Schema 
var commentsSchema = new Schema(
    {
        userName: String, 
        text: String,
        datePublishedOn:{type:Date, default:Date.now}
    }, {timestamps:true}
)
//Touring Schema
var touringSchema = new Schema(
    {
        title: String, 
        AboutMe: {type:String, required: true}, 
        activity:[],
        imageURL: String,  
        likes:{type:Number, default:0},
        comments: [commentsSchema],
        // you might be agency as well in future.
        sponsored:{type:Boolean, default:false},     
    }, {timestamps:true}
) 
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
    tour:{type:Boolean, default:false}, 
    touring:[touringSchema],
    img:String 
    }
    , {timestamps:true}
)

//manipulate data with Models 
var User = mongoose.model("User", userSchema);
var Touring = mongoose.model("Touring", touringSchema ); 

//Export Models
module.exports = {User, Touring}