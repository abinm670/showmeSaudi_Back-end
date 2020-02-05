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
var RegUser = require('../models/regUser')
var TourUser = require('../models/tourUser').TourUser

var Booking = require('../models/booking');
var Comment = require('../models/comment')
var Package = require('../models/tourUser').Package

router.use(express.urlencoded());

//create RegUser 
router.post('/api/newRuser', (req, res) => {
  RegUser.create(req.body)
    .then(newTuser => {
      res.json(newTuser);
    }).catch((err) => {
      console.log("tour user cant be created", err);
    });
});
// show specific user 
router.get('/api/r-user/:id', (req, res) => {
  RegUser.findById(req.params.id, (err, foundUser) => {
    res.send(foundUser)
  })
})
//show all user
router.get('/api/r-users', (req, res) => {
  RegUser.find()
    .then(user => {
      res.send(user)
      console.log("okay")
    }).catch(err => console.log(err))
})
// delete user account
router.delete('/api/r-user/delete/:id', (req, res) => {
  RegUser.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log("user not delete", err)
    }
    else {
      res.redirect('/api/r-users');
      console.log("deleted perfect")
    }
  })
})

// edit - complete
router.put('/api/r-user_edit/:id', (req, res) => {
  RegUser.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(userUpdate => {
      res.json(userUpdate)
    }).catch(err => {
      console.log("could not update tour user", err)
    });
})


router.put('/api/t-userRate/:id/:rate/:raters', (req, res) => {
  console.log(req.params)
  TourUser.findOneAndUpdate({ _id: req.params.id }, { $set: req.params }, { new: true })

      .then(userUpdate => {
        res.json(userUpdate)
      }).catch(err => {
        console.log("could not update tour user", err)

  
      });
  })


//Loging ---- Completed     
router.post('/api/r-login', (req, res) => {
  //make sure they send pass & user
  if (req.body.email && req.body.password) {
    RegUser.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        res.status(400).json({ error: "Invalid pass or email" })
      }
      else {
        if (req.body.email === user.email && req.body.password == user.password) {
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
router.get('/api/r-protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'you are authorized',
    user: req.user
  });
});
//booking 
router.post('/api/r-booking/:tourguyId/:regUserId/:date', (req, res) => {
  //id is for tourguy
  TourUser.findById({ _id: req.params.tourguyId })
    .then(Tuser => {
      const tourguyb = Tuser
      //id for regularUser
      RegUser.findById({ _id: req.params.regUserId })
        .then(Ruser => {
          const regUserb = Ruser
          
            Booking.findOne({date:req.params.date ,tourGuy: tourguyb}, (err, booking) =>{
              if(booking){
                res.send("Book can not made because this date is already reserved")
              }else{
                 Booking.create({ tourGuy: tourguyb, regUser: regUserb, date:req.params.date })
                .then(book => 
                  res.json("yes", book),
                  res.send("Book is made successfully")
                  )
              }
            })
        
        })
    })
})
router.post('/api/r-comment/:tourguyId/:regUserId/:comment', (req, res) => {
  //id is for tourguy
  console.log("inside post comment")
  TourUser.findById({ _id: req.params.tourguyId })
    .then(Tuser => {
      console.log("Tuser"+Tuser)
      const tourguyb = Tuser
      //id for regularUser
      RegUser.findById({ _id: req.params.regUserId })
        .then(Ruser => {
          console.log("Ruser"+Ruser)
          const regUserb = Ruser
          if(regUserb==null){   
            console.log("inside post comment is null")   
            res.send("comment can not made because regular user only can make comment")
          }
          else{
            console.log("Tring to find comment"+req.params.comment)
            // Comment.findOne({comment:req.params.comment ,tourGuy: tourguyb}, (err, commentt) =>{
            // if(commentt){
              //   res.send("comment can not made because this date is already reserved")
              // }else{
                 Comment.create({ tourGuy: tourguyb, regUser: regUserb, comment: req.params.comment })
                 .then(comment => {
                  TourUser.findByIdAndUpdate(req.body.id, { $push: { comment: comment } })
                  console.log("TourUser.Comment"+TourUser.Comment)
                  console.log("Tring to find comment.. creat it")
                 // .then(comm => 
                 //   res.json("yes", comm),
                   res.send("Comment is made successfully")
                   // )
                   console.log("Comment is made successfully")
                 })
            // }
          // })
          }
        })
    })
})
router.post('/api/r-comment/:tourguyId/:regUserId' , (req , res)=>{
  Comment.create({ tourGuy: req.params.tourguyId, regUser: req.params.regUserId, comment: req.body.comment })
  .then(comment =>{
    TourUser.findByIdAndUpdate(req.body.id, { $push: { comment: comment } })
    .then(user=>  {
      res.json({msg :  "comment created" , user })
    } ).catch(err => res.send(err))
  }).catch(err => res.send(err))
})

//get all booking
router.get('/api/r-booking/:regUserId',  (req, res) => {
  Booking.find({ regUser: req.params.regUserId })
    .then(books => {
      res.send(books)
      console.log("all book for" + req.params.regUserId)
    }).catch(err => console.log(err))
})

//get all booking
// router.get('/api/t-booking/:regUserId',  (req, res) => {
//   Booking.find({ regUser: req.params.regUserId })
//   .populate('tourGuy')
//   .exec((err,books)=>{
//     if (err){
//       res.status(500).send(err);
//       return;
//   }
//   res.json(books);
//   })
// })

// cancel booking
router.delete('/api/r-booking/delete/:id', (req, res) => {
  Booking.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) {
      res.json(err)
      console.log("booking not cancel", err)
    }
    else {
      res.json("perfect cancel booking")
      console.log("perfect cancel booking")
    }
  }); 
});

// Export the Router so we can use it in the server.js file
module.exports = router;