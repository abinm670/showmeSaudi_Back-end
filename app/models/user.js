var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Comments Schema 
var commentsSchema = new Schema(
  {
    comment: { type: String, required: [true, "can't be blank"] },
    datePublishedOn: { type: Date, default: Date.now },
    id2: String

  }, { timestamps: true }

)

var userSchema = new Schema(
  {
    email: { type: String, lowercase: true, unique: [true, "this email taken"], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: { type: String, required: [true, "can't be blank"] },
    firstName: { type: String, required: [true, "can't be blank"] },
    lastName: { type: String, required: [true, "can't be blank"] },
    tourType: { type: String, default: "regUser" },
    address: String,
    phone: String,
    // img: {type:String, required: [true, "should upload image"]},

    // second user 
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    tourGuy: {
      AboutMe: { type: String },
      package: [{
        packName: { type: String },
        // {packImg: {type:String, required: [true, "should upload image"]}},
        description: { type: String },
      }],
      likes: { type: Number, default: 0 },

      price: { type: String, default: "free" }
    },
    //  {timestamps: true }
  })


//manipulate data with Models 
var User = mongoose.model("User", userSchema);
var Comment = mongoose.model("Comment", commentsSchema);

//Export Models
module.exports = { User, Comment }













// for latter  google map 

  //   // will test this latter
  //   //location: {
  //   //     cityName:String, 
  //   //     type: pointSchema,
  //   //     required: true
  //   //   } 
  //   // you might have agency as a user in future.
  //   //         sponsored:{type:Boolean, default:false},     
  // }, { timestamps: true }


  // pointSchema
// const pointSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true
//   }
// });