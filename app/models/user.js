var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;


//Comments Schema 
var commentsSchema = new Schema(
    {
        userName: String, 
        text: {type:String, required:true},
        datePublishedOn:{type:Date, default:Date.now},
        // userCommented:{type : Schema.Types.ObjectId , ref: "comment"}
    }, {timestamps:true}
)

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

//Touring Schema
var touringSchema = new Schema(
    {
        title: String, 
        AboutMe: {type:String, required: true}, 
        activity:[],
        imageURL: String,  
        likes:{type:Number, default:0},
        imageURL: String,  
        comments: [commentsSchema],
        price: { type: Number, default:0 },
    
        // location: {
        //     cityName:String, 
        //     type: pointSchema,
        //     required: true
        //   } 
    // you might have agency as a user in future.
//         sponsored:{type:Boolean, default:false},     
    }, {timestamps:true}
) 
var userSchema = new Schema(
    {
    usrGenInfo:
    {
   
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
        // email:{type:String, required:true}, 

    } ,
    tour:{type:Boolean, default:false},  
    address: String, 
    phone: String,
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
