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

//Create a new user 
var User = require('./app/models/user').User
var Touring = require('./app/models/user').Touring


//optional 
//defien---------------------------------------------

//Instantiate Express Application Object 
const app = express();
app.use(express.json());

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



//create user 
app.post('/api/newUser', (req, res) => {

    if (req.body.touring.length > 0) {
        req.body.tour = true

    }
    else {
        req.body.tour = false
    }


    User.create(req.body, (error, newUser) => {
        
        console.log(req.body.touring.length)
        res.json(newUser);
        
    })
})

//create touring embedded in user
app.post('/api/users/:userId/touring', (req, res) => {
    //store new Touring profile with data from request body
    var newTourProfile = new Touring({ newTourProfile: req.body.newTourProfile });

    //find user in db by id and add new tourProfile
    User.findById(req.params.userId, (error, findUser) => {
        findUser.touring.push(newTourProfile);
        findUser.save(
            (err, savedUser) => {
                res.json(savedUser);
                // console,log(savedUser)
            });

    });
});

// Create Show Route 
app.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.send(foundUser)
    })
})

//show all user
app.get('/api/users_all', (req, res) => {
    User.find({}, (err, foundUser) => {
        res.send(foundUser);

    })
})




// view the index message using the route 
const indexRouter = require('./app/routes/index');
app.use(indexRouter);

//Define PORT for API to run on 
const port = process.env.Port || 7000;

//Start the server to listen for request on a given port
app.listen(port, function () {
    console.log(`Tour App is listening on port ${port}`);
})
