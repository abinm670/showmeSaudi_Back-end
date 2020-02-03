var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;


//Comments Schema 
var commentsSchema = new Schema(
  {
  tourGuy:{
    type: Schema.Types.ObjectId,
    ref:'tUser'
  },
  regUser:{
    type: Schema.Types.ObjectId,
    ref:'rUser'
  },
  comment: { type: String, required: [true, "can't be blank"] },
  datePublishedOn: { type: Date, default: Date.now },
  id2: String 
  // name:String
  }, { timestamps: true }

)

//manipulate data with Models 
var Comment = mongoose.model("Comment", commentsSchema);

//Export Models
module.exports = Comment;
