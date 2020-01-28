var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;


//Comments Schema 
var commentsSchema = new Schema(
    {
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
        AboutMe: {type:String, required: true}, 
        activity:[],
        likes:{type:Number, default:0},
        img: {type:String, required: true},  
        comments: [commentsSchema],
    
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
      email:{type:String, required:true}, 
      password:{type:String, required:true},
      firstName:{type:String, required:true},
      lastName:{type:String, required:true},
  //   usrGenInfo:
  //   {

  //  // comments : [{type : Schema.Types.ObjectId , ref: "comment"}],
  //   } ,
    tour:{type:Boolean, default:false},  
    address: String, 
    phone: String,
    touring:[touringSchema],
    }
    , {timestamps:true}
)
//manipulate data with Models 
var User = mongoose.model("User", userSchema);
var Touring = mongoose.model("Touring", touringSchema ); 
var Comment = mongoose.model("Comment", commentsSchema ); 

//Export Models
module.exports = {User, Touring,Comment}
