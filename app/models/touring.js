var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

const Comment = require('./comment.js');
const userSchema = require('./user.js');

//console.log(Comment);
// console.log("Details");

//Touring Schema
var touringSchema = new Schema(
    {
        title: String, 
        AboutMe: {type:String, required: true}, 
        activity:[],
        imageURL: String,
        likes:{type:Number, default:0},  
        comments: Comment.obj,
        // location: {
        //     cityName:String, 
        //     type: pointSchema,
        //     required: true
        //   } 
    // you might have agency as a user in future.
//         sponsored:{type:Boolean, default:false},     
    }, {timestamps:true}
)

//var Touring = mongoose.model("Touring", touringSchema ); 
//Export Models
module.exports = touringSchema;