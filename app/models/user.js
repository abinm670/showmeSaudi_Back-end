var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

//Touring Schema
var touringSchema = new Schema(
    {
        title: String, 
        AboutMe: {type:String, required: true}, 
        likes:{type:Number, default:0}, 
        // comments:[commentSchema]
        sponsored:{type:Boolean, default:false}, 
        activity:[]
    }, {timestamps:true}
) 


var userSchema = new Schema(
    {
    name:
    {
        firtNmae:String, 
        lastName:String, 
    }, 
    address: String, 
    phone: String,
    tour:{type:Boolean, default:false}, 
    touring:[touringSchema], 
    
    }, {timestamps:true}
)

//manipulate data with Models 
var User = mongoose.model("User", userSchema);
var Touring = mongoose.model("Touring", touringSchema ); 

//Export Models
module.exports = {User, Touring}


//both Schema can be modify to meet our needs 

//Define comments Schema
// const commentSchema = new Schema(

//    {
//        content: String, 
//        publishedOn: {type:Date, default:Date.now},
//        author:String, 
//        published:{type:Boolean, default:true}
//    }, {timestamps:true}
// ); 


