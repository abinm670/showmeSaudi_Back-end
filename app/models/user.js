var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

//both Schema can be modify to meet our needs 

//Define comments Schema
const commentSchema = new Schema(

   {
       content: String, 
       publishedOn: {type:Date, default:Date.now},
       author:String, 
       published:{type:Boolean, default:true}
   }, {timestamps:true}
); 




//Touring Schema
var touringSchema = new Schema(
    {
        title: {type: String, index= true},
        AboutMe: {type:String, required: true}, 
        likes:{type:Number, default:0}, 
        comments:[commentSchema]


    }
) 


var user = new Schema(
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
    
    }
)