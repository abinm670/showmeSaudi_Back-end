//Require necessary NPM packages.
const express = require('express');
const parser = require('body-parser');


//mongoose required statment 
const mongoose = require('mongoose');
const cors = require('cors')
// var Comment = require('./app/models/comments');
//db require and establish the connection
const db = require('./config/db');
//and the establish db connection
mongoose.connect(db, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once('open', function () {
    console.log('conected to mongo');
}).catch((error) => {
    assert.isNotOk(error, 'Promise error');
    done();
});



//Instantiate Express Application Object 
const app = express();
app.use(cors())

//tell node to use json and HTTP header features 
//in body-parser
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// require route 
const indexRouter = require('./app/routes/index');
app.use(indexRouter);

//tour user
const tourUserRouter = require('./app/routes/tourUser');
app.use(tourUserRouter);

//regUser
const regUserRouter = require('./app/routes/regUser');
app.use(regUserRouter);

//Define PORT for API to run on 
const port = process.env.Port || 3000;

//Start the server to listen for request on a given port
app.listen(port, function () {
    console.log(`Tour App is listening on port ${port}`);

});



