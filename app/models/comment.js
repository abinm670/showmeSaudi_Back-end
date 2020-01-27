var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

const touringSchema = require('../models/touring');
const userSchema = require('../models/user');

//Comments Schema 
var commentsSchema = new Schema(
    {
        userName: String, 
        text: String,
        datePublishedOn:{type:Date, default:Date.now}
    }, {timestamps:true}
)

//manipulate data with Models 
var Comment = mongoose.model("Comment", commentsSchema);

//Export Models
module.exports = Comment;
