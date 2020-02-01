const express = require('express');
var mongoose = require("mongoose");
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

//image Upload 
const multer = require('multer');
// img guidLine info
const middlewares = require('../models/middlewares');
const path = require('path');
const fileUpload = require('express-fileupload');

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
var TourUser = require('../models/tourUser')
var Booking = require('../models/booking');






//Middleware required for post
router.use(express.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));
router.use(fileUpload());


//create RegUser 
router.post('/api/newRuser',middlewares.upload.single('img'), (req, res) => {
  RegUser.create(req.body)
    .then(newTuser => {
      res.json(newTuser);

    }).catch((err) => {
      console.log("tour user cant be created", err);

    });
});

// Upload Endpoint
router.post('/api/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/../uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `../uploads/${file.name}` });
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
  // User.find({}, (err, foundUser) => {
  //     res.send(foundUser);

  // })
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
router.put('/api/r-user_edit/:id', (req, res) => {

  RegUser.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
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

router.get('/api/r-protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'you are authorized',
    user: req.user
  });
});


//booking 
router.post('/api/r-booking/:tourguyId', (req, res) => {
  //id is for tourguy
  TourUser.findById({ _id: req.params.tourguyId })
    .then(Tuser => {

      const tourguyb = Tuser
      //id for regularUser
      RegUser.findById({ _id: req.user._id })
        .then(Ruser => {
          const regUserb = Ruser
          Booking.create({ tourGuy: tourguyb, regUser: regUserb })
            .then(book => 
              res.json("yes", book),
              res.send("Book is made successfully")
              )
        })

    })
})

//get all booking
router.get('/api/r-booking', passport.authenticate('jwt'), (req, res) => {
  Booking.find({ regUser: req.user._id })
    .then(books => {
      res.send(books)
      console.log("all book for" + req.user._id)
    }).catch(err => console.log(err))
})

// cancel booking
router.delete('/api/r-booking/delete/:id', (req, res) => {
  Booking.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) {
      console.log("booking not cancel", err)
    }
    else {
      res.redirect('/');
      console.log("perfect cancel booking")
    }
  });
});





// Export the Router so we can use it in the server.js file
module.exports = router;