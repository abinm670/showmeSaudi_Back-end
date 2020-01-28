//Require necessary NPM packages.
const express = require('express');

//mongoose required statment 
const mongoose = require('mongoose');

// var Comment = require('./app/models/comments');

//db require and establish the connection
const db = require('./config/db');
//and the establish db connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, 
     useFindAndModify: false  });
mongoose.connection.once('open', function () {
    console.log('conected to mongo');
})


//Instantiate Express Application Object 
const app = express();
app.use(express.json());

// require route 
const indexRouter = require('./app/routes/index');
app.use(indexRouter);
const usersRouter = require('./app/routes/users');
app.use(usersRouter);


//Define PORT for API to run on 
const port = process.env.Port || 7000;

//Start the server to listen for request on a given port
app.listen(port, function () {
    console.log(`Tour App is listening on port ${port}`);

});
