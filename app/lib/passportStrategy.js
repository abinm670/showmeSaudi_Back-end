const passportJWT = require('passport-jwt');
const jwtOption = require('./passportOptions');

// Require Mongoose Model for User & Touring

var regUser = require('../models/regUser')
var tourUser = require('../models/tourUser')


const jwtStrategy = passportJWT.Strategy;

//new jwtStrategy(options, verify)
// to see if the user that send request has token & not expired
//tourUser
const strategy = new jwtStrategy(jwtOption,function(jwtPayload,done){
    console.log(`payload is recived`);
    console.log(`User Id: ${jwtPayload.id}`);
    console.log(`expires in : ${jwtPayload.exp}`);

    regUser.findById({ _id: jwtPayload.id }, (err, user) => {
        if (err){
          console.log(err);
        } else {
            if(jwtPayload.id==user.id){
                done(null,user);
            }
            else{
                done(null,false);
            }
        }
      }) || tourUser.findById({ _id: jwtPayload.id }, (err, user) => {
        if (err){
          console.log(err);
        } else {
            if(jwtPayload.id==user.id){
                done(null,user);
            }
            else{
                done(null,false);
            }
        }
      })
    
})







module.exports=strategy;