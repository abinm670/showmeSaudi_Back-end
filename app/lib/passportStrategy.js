const passportJWT = require('passport-jwt');
const jwtOption = require('./passportOptions');

const jwtStrategy = passportJWT.Strategy;

const testUser = {id :44 , username:"hanin" , password:"123abc"}

//new jwtStrategy(options, verify)
// to see if the user that send request has token & not expired
const strategy = new jwtStrategy(jwtOption,function(jwtPayload,done){
    console.log(`payload is recived`);
    console.log(`User Id: ${jwtPayload.id}`);
    console.log(`expires in : ${jwtPayload.exp}`);

    if(jwtPayload.id==testUser.id){
        done(null,testUser);
    }
    else{
        done(null,false);
    }
})

module.exports=strategy;