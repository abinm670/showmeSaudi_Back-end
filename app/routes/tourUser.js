// Require necessary NPM Packages
const express = require('express');
var mongoose = require("mongoose");
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
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
var Booking = require('../models/booking');
var TourUser = require('../models/tourUser').TourUser
var Comment = require('../models/comment')
var Package = require('../models/tourUser').Package
var RegUser = require('../models/regUser')
//create tourUser 
router.post('/api/newTuser', (req, res) => {

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
})

//show all user in specific city
router.get('/api/t-users/:city', (req, res) => {
  TourUser.find({ city: req.params.city }, (err, foundUser) => {

    res.send(foundUser)
  })
})
// delete user account
router.delete('/api/t-userD/:id', (req, res) => {
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
          const payLoad = { user: user };
          //create token and send it to user 
          const token = jwt.sign(payLoad, jwtOption.secretOrKey, { expiresIn: 5000 })
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

router.get('/api/t-comment/:tourguyId', (req, res) => {
  Comment.find({ tourGuy: req.params.tourguyId })
    .then(com => {
      console.log(com)
      res.send(com)
      console.log("all com for" + req.params.tourguyId)
    }).catch(err => console.log(err))
})

// // write a comment on tour guy profile
// router.post('/api/comment', (req, res) => {
//   console.log("add comment")
//   Comment.create({ comment: req.body.comment, id2: req.body.id2 })
//     .then(comment => {
//       console.log(comment)
//       console.log(res) 
//       //  { $pash: { comments: comment._id }
//       TourUser.findByIdAndUpdate(req.body.id, { $push: { comments: comment._id } })
//         .then(user => {
//           console.log(user)
//           res.json({ msg: "the comment has been added " })
//           console.log(comments)
//         })
//         .catch(err => res.json(err))
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })


//get all booking
router.get('/api/t-booking/:tourGuyId', (req, res) => {
  Booking.find({ tourGuy: req.params.tourGuyId })
    .then(books => {
      for (let i in res.data) {
        console.log("for")

        RegUser.find(data[i].regUser, (err, foundUser) => {
          res.send(foundUser)
        })
        console.log("all book for" + req.params.tourGuyId)
      }
      res.send(books)
    })
    .catch(err => console.log(err))
})

// router.get('/api/t-booking/:tourGuyId',  (req, res) => {
//   Booking.find({ tourGuy: req.params.tourGuyId })
//   .populate('regUser')
//   .exec((err,books)=>{
//     if (err){
//       res.status(500).send(err);
//       return;
//   }
//   res.json(books);
//   })
// })

// cancel booking
router.delete('/api/t-booking/delete/:id', (req, res) => {
  Booking.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) {
      console.log("booking not cancel", err)
    }
    else {
      console.log("perfect cancel booking")
    }
  });
});

//add package
router.post('/api/t-users/:TuserId/packages', (req, res) => {
  const newPackage = new Package({ name: req.body.name, packImage: req.body.packImage, description: req.body.description });
  TourUser.findById(req.params.TuserId, (err, foundUser) => {
    foundUser.packages.push(newPackage);
    foundUser.save((err, savedUser) => {
      res.json(savedUser);
    })
  })
})

//get package for specific tourGuy
router.get('/api/t-users/:TuserId/packages',(req,res)=>{
  TourUser.findById(req.params.TuserId,(err,foundUser)=>{
          res.json(foundUser.packages);

  })
})


//get all packages
router.get('/api/tPack-users', (req, res) => {
  TourUser.find({}, {packages:1,firstName:1,lastName:1,city:1})
    .then(pack => {
      res.send(pack)
      res.json(pack)
    }).catch(err => console.log(err))
})                                  

//update package
router.put('/api/t-users/:TuserId/packages/:id', (req, res) => {
  // set the value of the user and package ids
  var userId = req.params.TuserId;
  var packageId = req.params.id;
  // find user in db by id
  TourUser.findById(userId, (err, foundUser) => {
    // find package embedded in user
    var foundPackage = foundUser.packages.id([packageId]);
    // update package body and completed with data from request body
    foundPackage.name = req.body.name;
    foundPackage.packImage = req.body.packImage;
    foundPackage.description = req.body.description;
    foundUser.save((err, savedUser) => {
      res.json(foundPackage);
      res.json(savedUser);
    });
  });
});


// show tour user rating
router.get('/api/t-userRate/:id', (req, res) => {
  TourUser.findById(req.params.id, (err, foundUser) => {
    res.json({ rate: foundUser.rate, raters: foundUser.raters });
  })
})

// delete by updatting the package 
router.put('/api/deleteOnePackig/:id' , (req, res)=>{
  TourUser.findById(req.body.id)
  .then(user => {
    var newUser = user 
    newUser.packages =  user.packages.filter(ele =>{
      return ele._id != req.params.id
    })
    console.log( newUser.packages)
    TourUser.findByIdAndUpdate(req.body.id , newUser)
  .then(pack => res.json({msg : "the packig has been removed !!!" , pack}))
  .catch(err => console.log(err))

  })
  .catch( err => res.json(err))
})

// Export the Router so we can use it in the server.js file
module.exports = router;
