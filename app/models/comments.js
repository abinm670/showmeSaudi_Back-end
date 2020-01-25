var mongoose = require("mongoose"); 
var Schema = mongoose.Schema; 


var commentsSchema = new Schema({
    text: {
        type: String,
        default:""
    },
    date: { type: Date, default: Date.now },
    
})

var Comment = mongoose.model("Comment", commentsSchema); 

module.exports = Comment