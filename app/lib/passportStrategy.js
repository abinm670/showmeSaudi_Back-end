const passportJWT = require('passport-jwt');
const jwtOption = require('./passportOptions');

// Require Mongoose Model for User & Touring
var User = require('../models/user').User
var Touring = require('../models/user').Touring
var Comment = require('../models/user').Comment

const jwtStrategy = passportJWT.Strategy;

const testUser = {id :44 , username:"hanin" , password:"123abc"}

//new jwtStrategy(options, verify)
// to see if the user that send request has token & not expired
const strategy = new jwtStrategy(jwtOption,function(jwtPayload,done){
    console.log(`payload is recived`);
    console.log(`User Id: ${jwtPayload.id}`);
    console.log(`expires in : ${jwtPayload.exp}`);

    User.findById({ id: jwtPayload.id }, (err, user) => {
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