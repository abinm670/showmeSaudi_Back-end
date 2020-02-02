var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Comments Schema 
const Comment = require('./comment.js').commentsSchema;

var tourUserSchema = new Schema(
  {
    email: { type: String, lowercase: true, unique: [true, "this email taken"], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: { type: String, required: [true, "can't be blank"] },
    firstName: { type: String, required: [true, "can't be blank"] },
    lastName: { type: String, required: [true, "can't be blank"] },
    tourType: { type: String, default: "tourUser" },
    city: String,
    // address: {type:String, default:'Jeddah', enum:['Riyadh' , 'Jeddah' ,'Al-Ola' , 'Al-khobar', 'Abha', 'Jazan'], required:[true, "cant be balnk"]}, 
    phone: String,
    // img: {type:String, required: [true, "should upload image"]},
    comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    AboutMe: { type: String },
    package: [{
    packName: { type: String },
        // {packImg: {type:String, required: [true, "should upload image"]}},
    description: { type: String },
      }],  
    likes: { type: Number, default: 0 },
    rate:{type:Number,default:0},
    price: { type: String, default: "free" }
    //  {timestamps: true }
  })


//manipulate data with Models 
var TourUser = mongoose.model("tourUser", tourUserSchema);


//Export Models
module.exports = TourUser;













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
