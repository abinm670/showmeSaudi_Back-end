// Require necessary NPM Packages
const express = require('express');
var mongoose = require("mongoose");
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
///for image
const multer = require('multer');

const storage = multer.diskStorage({
    //cb call back function
  destination: function (req,file,cb){
    // make uploads folder to store img
    cb(null, './uploads/');
  },
  filename: function(req,file,cb){
    cb(null,  Date.now()+file.originalname);
  }
});

const fileFilter=(req,file,cb)=>{
  //file not accept if this false
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    //accept
    cb(null,true);
  }
  else{
    //reject
    cb(null,false);
  }
}

const upload = multer({
  storage:storage,
  limits:{
    fileSize: 1024 * 1024 * 5
  },
  fileFilter:fileFilter
})

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
var User = require('../models/user').User
var Touring = require('../models/user').Touring
var Comment = require('../models/user').Comment

// Middleware required for post
// router.use(express.urlencoded());


//create user 
router.post('/api/newUser', upload.single('tourGuyImg'), (req, res) => {
    // if(req.body.touring[1])
    // {
    //store new Touring profile with data from request body
    // var newTourProfile = new Touring({ newTourProfile: req.body.newTourProfile });
    if (req.body.touring !== undefined) {
      newuser = req.body
      newuser.tour = true;
      newuser.tourGuyImg=req.file.path
     
    User.create(newuser)
    .then  (newTuser=> {
      res.json(newTuser);
        
    }).catch((err) =>
    {
        console.log("tour user cant be created",  err);

    });
  }else {
    User.create(req.body)
    .then (newRuser =>
      {
        res.json(newRuser);
      }).catch((err)=> console.log("regular user cant be created", err))
  }
});

// show specific user 
router.get('/api/user/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.send(foundUser)
    })
})

//show all user
router.get('/api/users', (req, res) => {

    User.find()
        .then(user => {
            res.send(user)
            console.log("okay")

        }).catch(err => console.log(err))
    // User.find({}, (err, foundUser) => {
    //     res.send(foundUser);

    // })
})

// delete user account
router.delete('/api/user/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
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
router.put('/api/user_edit/:id', (req, res)=>{
  // if the tour profile is not empty then make 
  if(req.body.touring !== undefined)
      {
        req.body.tour = true;  
  User.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {new: true} )
    .then(userUpdate => {
       
    res.json(userUpdate)
      }).catch(err =>
      {
        console.log("could not update tour user",err )
      })
    }else{
  req.body.tour = false;  
  User.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {new: true} )
    .then(userUpdate => {
       
    res.json(userUpdate)
      }).catch(err =>
      {
        console.log("could not update reg user",err )
      })
      

    }
  });
    
    //   else{
    //     userUpdate.tour = false;
    //     res.json(userUpdate);
    //   }
    // })  
    //   // Catch any errors that might occur
    //   .catch(function(err) {
    //     res.status(status).json(obj);
    //     //res.json("cant update", err);
    //   });
    // })

//Loging ---- Completed     
router.post('/api/login', (req, res)=>{
  //make sure they send pass & user
  if(req.body.email && req.body.password){
    User.findOne( {email: req.body.email},(err, user) => {
          if (!user){
            res.status(400).json({error: "Invalid pass or email"})
          }
           else {
            if(req.body.email=== user.email && req.body.password=== user.password){
                  const payLoad={id:user.id};
                
                //create token and send it to user 
                const token = jwt.sign(payLoad,jwtOption.secretOrKey,{expiresIn:300})
                res.status(200).json({success:true,token:token})
              }
              else{
                res.status(401).json({error:'Invalid pass or email'})
              }
          }
        }
        )

  }
  else{
    res.status(400).json({error:'username & pass are required'})
  }
})

router.get('/api/protected', passport.authenticate('jwt',{session:false}), (req,res)=>{
  res.json({message:'you are authorized',
  user:req.user
});
});

// write a comment on tour guy profile
router.post('/api/comment', (req, res) => {
  Comment.create({ comment: req.body.comment, id2: req.body.id2 })
      .then(comment => {
          Touring.findByIdAndUpdate(req.body.id, { $push: { comments: comment._id } })
              .then(user => res.json({ msg: "the comment has been added " }))
              .catch(err => res.sent(err))
          res.send(comment)
      })
      .catch(err => {
          console.log(err)
          res.send(err)
      })
})


// Export the Router so we can use it in the server.js file
module.exports = router;