// Require necessary NPM Packages
const express = require('express');
var mongoose = require("mongoose");
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

//image Upload 
const multer = require('multer');
// img guidLine info
const middlewares = require('../models/middlewares');
const path = require('path');

// fixe the DeprecationWarning:
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//require pass
const passport = require('passport');
const jwt = require('jsonwebtoken');

const jwtOption = require('../lib/passportOptions');
const strategy = require('../lib/passportStrategy');

//strategy middleware
passport.use(strategy);

// Require Mongoose Model for User & Touring
var TourUser  = require('../models/tourUser')
var Comment = require('../models/comment')

// Middleware required for post
// router.use(express.urlencoded());


//create tourUser 
router.post('/api/newTuser', middlewares.upload.single('tourGuyImg'), (req, res) => {
 
  TourUser.create(req.body)
      .then(newTuser => {
        res.json(newTuser);

      }).catch((err) => {
        console.log("tour user cant be created", err);

      });
    });
  
      

// show specific user 
router.get('/api/t-user/:id', (req, res) => {
  TourUser.findById(req.params.id, (err, foundUser) => {
    res.send(foundUser)
  })
})

//show all user
router.get('/api/t-users', (req, res) => {

  TourUser.find()
    .then(user => {
      res.send(user)
      console.log("okay")

    }).catch(err => console.log(err))
  // User.find({}, (err, foundUser) => {
  //     res.send(foundUser);

  // })
})

// delete user account
router.delete('/api/t-user/delete/:id', (req, res) => {
  TourUser.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log("user not delete", err)
    }
    else {
      res.redirect('/api/users');
      console.log("deleted perfect")

    }
  })
})

//Update tour guy profile 
// router.put('/api/user_account/:u_id/profile/:id', (req, res) => {
// set a new value of the user and profile 
// var u_id = req.params.u_id;
// var p_id = req.params.id;
// // find user in db by id
// User.findById(u_id, (err, foundUser) => {
//     //find profile embeded in user
//     var foundProfile = foundUser.touring.id(p_id)
//     //update the profile from the requested body
//     foundProfile.title = req.body.title;
//     //save 
//     foundProfile.save((err, savedUser) => {
//         res.json(foundProfile);
//     })
//     console.log("is good")
// })
// })


// edit - complete
router.put('/api/t-user_edit/:id', (req, res) => {
  
  TourUser.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      .then(userUpdate => {

        res.json(userUpdate)
      }).catch(err => {
        console.log("could not update tour user", err)
      });
 


  })



//Loging ---- Completed     
router.post('/api/t-login', (req, res) => {
  //make sure they send pass & user
  if (req.body.email && req.body.password) {
    TourUser.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        res.status(400).json({ error: "Invalid pass or email" })
      }
      else {
        if (req.body.email === user.email && req.body.password === user.password) {
          const payLoad = { id: user.id };

          //create token and send it to user 
          const token = jwt.sign(payLoad, jwtOption.secretOrKey, { expiresIn: 300 })
          res.status(200).json({ success: true, token: token })
        }
        else {
          res.status(401).json({ error: 'Invalid pass or email' })
        }
      }
    }
    )

  }
  else {
    res.status(400).json({ error: 'username & pass are required' })
  }
})

router.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'you are authorized',
    user: req.user
  });
});

// write a comment on tour guy profile
router.post('/api/comment', (req, res) => {
  Comment.create({ comment: req.body.comment, id2: req.body.id2 })
    .then(comment => {
      console.log(comment)
      console.log(res)
      //  { $pash: { comments: comment._id }
      TourUser.findByIdAndUpdate(req.body.id, { $push: { comments: comment._id } })
        .then(user => {
          console.log(user)
          res.json({ msg: "the comment has been added " })
          console.log(comments)

        })
        .catch(err => res.json(err))
      // res.send(comment)
    })
    .catch(err => {
      console.log(err)
      // res.send(err)
    })
})


// Export the Router so we can use it in the server.js file
module.exports = router;