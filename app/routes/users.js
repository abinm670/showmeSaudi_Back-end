// Require necessary NPM Packages
const express = require('express');

// Require Mongoose Model for User & Touring
var User = require('../models/user').User
var Touring = require('../models/user').Touring

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

// Middleware required for post
router.use(express.urlencoded());


//create user 
router.post('/api/newUser', (req, res) => {

    User.create(req.body, (error, newUser) => {
        
        
        if(!req.body.tour)
        {

              //store new Touring profile with data from request body
    var newTourProfile = new Touring({ newTourProfile: req.body.newTourProfile });
    //  res.json(newUser)
    //find user in db by id and add new tourProfile
    User.findById(req.params.userId, (error, findUser) => {
        findUser.touring.push(newTourProfile);
        findUser.save(
            (err, savedUser) => {
                res.json(savedUser + //create user 
router.post('/api/newUser', (req, res) => {

    User.create(req.body, (error, newUser) => {
        
        
        if(!req.body.tour)
        {
              //store new Touring profile with data from request body
    var newTourProfile = new Touring({ newTourProfile: req.body.newTourProfile });
     res.json(newUser)
    //find user in db by id and add new tourProfile
    User.findById(req.params.userId, (error, findUser) => {
        findUser.touring.push(newTourProfile);
        findUser.save(
            (err, savedUser) => {
                res.json(savedUser);
                // console,log(savedUser)
            });

    });
    
        }else {
            res.json(newUser);
        }
        
    })
}));
                // console,log(savedUser)
            });

    });
    
        }else {
            res.json(newUser);
        }
        
    })
})


// show specific user 
router.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.send(foundUser)
    })
})

//show all user
router.get('/api/users', (req, res) => {
    User.find({}, (err, foundUser) => {
        res.send(foundUser);

    })
})


// Export the Router so we can use it in the server.js file
module.exports = router;