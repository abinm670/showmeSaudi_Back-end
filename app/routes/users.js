// Require necessary NPM Packages
const express = require('express');

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
            res.json(newTrUser);

        }
        else {
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
            res.send(user)
            console.log("okay")

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

router.put('/api/user_eddit/:id', (req, res)=>
{
  let u_id =req.params.id;
      User.find({_id:u_id})
      .then  (findUser =>
      
         { if(!findUser.tour)
          {
            findUser.firstName = req.body.firstName;
            res.json(findUser)   
            console.log(findUser.usrGenInfo);
          }
          else{
              res.json("wrong ID ")
          }

      }).catch((err)=>
      {
          console.log("somethingwrong", err)
      })
    

})



////////
// const testUser = {id :44 , username:"hanin" , password:"123abc"}

router.post('/api/login', (req, res)=>{
  //make sure they send pass & user
  if(req.body.email && req.body.password){
    var e=req.body.email
    var p=req.body.password
    console.log("this email",e);
    console.log("this pass",p);

    emailUser=User.findOne({ email: e }, (err, user) => {
          if (err){
            console.log(err);
          } else {
            console.log(user);
          }
        })
    passUser=User.findOne({ password: p }, (err, user) => {
            if (err){
              console.log(err);
            } else {
              console.log(user);
            }
          })
    if(req.body.email=== emailUser && req.body.password=== passUser){
      console.log("hi2");
        const payLoad={id:User.find({id:req.body.id})};
      
      //create token and send it to user 
      const token = jwt.sign(payLoad,jwtOption.secretOrKey,{expiresIn:300})
      res.status(200).json({success:true,token:token})
    }
    else{
      res.status(401).json({error:'Invalid pass or email'})
    }

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


// Export the Router so we can use it in the server.js file
module.exports = router;

