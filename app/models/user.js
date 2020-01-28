var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;


//Comments Schema 
var commentsSchema = new Schema(
    {
        text: {type:String, required: [true, "can't be blank"]},
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
        AboutMe: {type:String, required: [true, "can't be blank"]}, 
        activity:[],
        likes:{type:Number, default:0},
        img: {type:String, required: [true, "should upload image"]},  
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
      email:{type:String, lowercase: true, unique: [true, "this email taken"], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']}, 
      password:{type:String, required: [true, "can't be blank"]},
      firstName:{type:String, required: [true, "can't be blank"]},
      lastName:{type:String, required: [true, "can't be blank"]},
  //  // comments : [{type : Schema.Types.ObjectId , ref: "comment"}],
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
