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
    // if(req.body.touring[1])
    // {
    //store new Touring profile with data from request body
    // var newTourProfile = new Touring({ newTourProfile: req.body.newTourProfile });
    User.create(req.body)
    .then  (newTrUser=> {

        if (req.body.touring !== undefined) {
            newTrUser.tour = true;
            console.log("heloo baby");
            res.json(newTrUser);

        }
        else {
            console.log("bye baby");
            res.json(newTrUser);
        }

    }).catch((errr) =>
    {
        console.log("yes you did it wrong",  errr);

    });

});

// show specific user 
router.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.send(foundUser)
    })
})

//show all user
router.get('/api/users', (req, res) => {

    User.find()
        .then(user => {
            res.send()

        }).catch(err => console.log(err))
    // User.find({}, (err, foundUser) => {
    //     res.send(foundUser);

    // })
})

// delete user account
router.delete('/api/user_info/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.log("user not delete", err)
        }
        else {
            res.redirect('/api/all_users');
            console.log("deleted perfect")
        }
    })
})

//Update tour guy profile 
router.put('/api/user_account/:u_id/profile/:id', (req, res) => {
    // set a new value of the user and profile 
    var u_id = req.params.u_id;
    var p_id = req.params.id;
    // find user in db by id
    User.findById(u_id, (err, foundUser) => {
        //find profile embeded in user
        var foundProfile = foundUser.touring.id(p_id)
        //update the profile from the requested body
        foundProfile.title = req.body.title;
        //save 
        foundProfile.save((err, savedUser) => {
            res.json(foundProfile);
        })
        console.log("is good")
    })
})

// Export the Router so we can use it in the server.js file
module.exports = router;
