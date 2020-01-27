// Require necessary NPM Packages
const express = require('express');

// Require Mongoose Model for User
var User = require('../models/user');
var Touring = require('../models/touring');
var Comment = require('../models/comment');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

// Middleware required for post
router.use(express.urlencoded());


// //create user 
// router.post('/api/newUser', (req, res) => {

//     // if (req.body.touring.length > 0) {
//     //     req.body.tour = true

//     // }
//     // else {
//     //     req.body.tour = false
//     // }


//     User.create(req.body, (error, newUser) => {
        
//       //  console.log(req.body.touring.length)
//         res.json(newUser);
        
//     })
// })

//create user 2
// router.post('/api/newUser', (req, res) => {
//     User.create(req.body, (error, newUser) => {
//         if(req.body.tour === true)
//         {
//               //store new Touring profile with data from request body
//     var newTourProfile = new Touring({ newTourProfile: req.body.newTourProfile });
//     //find user in db by id and add new tourProfile
//     User.findById(req.params.userId, (error, findUser) => {
//         findUser.touring.push(newTourProfile);
//         findUser.save(
//             (err, savedUser) => {
//                 res.json(savedUser + newUser);
//                 // console,log(savedUser)
//             });
//     });
//         }else {
//             res.json(newUser);
//         }
//     })
// })

//create user 3
//create user 
router.post('/api/newUser', (req, res) => {
    User.create(req.body, (error, newUser) => {
    //     if(!req.body.tour)
    //     {
    //           //store new Touring profile with data from request body
    // var newTourProfile = new Touring({ newTourProfile: req.body.newTourProfile });
    //  res.json(newUser)
    // //find user in db by id and add new tourProfile
    // User.findById(req.params.userId, (error, findUser) => {
    //     findUser.touring.push(newTourProfile);
    //     findUser.save(
    //         (err, savedUser) => {
    //             res.json(savedUser);
    //             // console,log(savedUser)
    //         });
    // });
    //     }else {
    //         res.json(newUser);
    //     }
    res.json(newUser);

    })
})

//create touring embedded in user
router.post('/api/users/:userId/touring', (req, res) => {
    
    //find user in db by id and add new tourProfile
    User.findById(req.params.userId, (error, findUser) => {
     
        if(req.params.userId.tour===true){
            //store new Touring profile with data from request body
            var newTourProfile = new Touring({ title: req.body.title,AboutMe : req.body.AboutMe});

            findUser.touring.push(newTourProfile);
        findUser.save(
            (err, savedUser) => {
                res.json(savedUser);
                // console,log(savedUser)
            });
        }
        else {
            res.send("not touring");
        }
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
    User.find({}, (err, foundUser) => {
        res.send(foundUser);

    })
})

//show all tour guy
router.get('/api/TourGuy', (req, res) => {
    User.find({tour:"true"}, (err, foundUser) => {
        res.send(foundUser);

    })
})
// delete user account
router.delete('/api/user_info/delete/:id', (req, res) =>
{
    User.findByIdAndRemove(req.params.id, (err, data) =>
    {
        if(err)
        {
            console.log("user not delete", err)
        }
        else{
        res.redirect('/api/all_users');
        console.log("deleted perfect")
        }
    })
})

//Update tour guy profile 
router.put('/api/user_account/:u_id/profile/:id', (req, res) =>
{
    // set a new value of the user and profile 
    var u_id = req.params.u_id; 
    var p_id = req.params.id;
    // find user in db by id
    User.findById(u_id, (err, foundUser)=>
    {
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