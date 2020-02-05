var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Comments Schema 
const Comment = require('./comment.js').commentsSchema;

const packageSchema =new Schema({
  name :{
      type:String,
      default:''
  },
  packImage :{
    type:String,
    default:''
  },
  description :{
    type:String,
    default:''
  },
});

var tourUserSchema = new Schema(
  {
    email: { type: String, lowercase: true, unique: [true, "this email taken"], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: { type: String, required: [true, "can't be blank"] },
    firstName: { type: String, required: [true, "can't be blank"] },
    lastName: { type: String, required: [true, "can't be blank"] },
    tourType: { type: String, default: "tourUser" },
    city: {type:String, default:'Jeddah', enum:['Riyadh' , 'Jeddah' ,'Al-Ola' , 'Al-khobar', 'Abha', 'Jazan', 'Az Zulfi', 'Makkah' , 'Al-Madinah'], required:[true, "cant be balnk"]}, 
    phone: String,
    image: {type:String},
    comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    AboutMe: { type: String },
    packages: [packageSchema],  
    likes: { type: Number, default: 0 },
    rate:{type:Number,default:0},
    raters:{type:Number,default:0},
    price: { type: String, default: "free" }
    //  {timestamps: true }
  })
//manipulate data with Models 
var TourUser = mongoose.model("tourUser", tourUserSchema);
var Package = mongoose.model("package", packageSchema);
//Export Models
module.exports = {TourUser,Package};
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