//Require necessary NPM packages.
const express = require('express');

//mongoose required statment 
const mongoose = require('mongoose');

// call the comment file 
// var Comment = require('./app/models/comments');

//db require and establish the connection
const db = require('./config/db');
//and the establish db connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function () {
    console.log('conected to mongo');
})

//optional 
//defien---------------------------------------------

//Instantiate Express Application Object 
const app = express();
app.use(express.json());

// require route 
const indexRouter = require('./app/routes/index');
app.use(indexRouter);
const usersRouter = require('./app/routes/users');
app.use(usersRouter);


// -1 Create comments 
// var com1 = new Comment({
//     text: "hello the new world"
// })
// // -2 save 
// com1.save(function(err, saveCom)
// {
//     if(err){
//     return console.log(err)
//     }
//     else{ console.log('comm saved')}
// })

// // 1- create a new user 
// var ahmed = new User ({
//     name:
//     {
//         firtNmae:"Nona", 
//         lastName:"BM",

//     }

// })



//Define PORT for API to run on 
const port = process.env.Port || 7000;

//Start the server to listen for request on a given port
app.listen(port, function () {
    console.log(`Tour App is listening on port ${port}`);
})