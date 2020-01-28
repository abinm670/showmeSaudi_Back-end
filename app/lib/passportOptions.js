const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'ShowMeSaudi';

module.exports=jwtOptions;