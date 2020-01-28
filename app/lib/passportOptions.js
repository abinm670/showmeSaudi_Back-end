const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SEI_Jeddah';

module.exports=jwtOptions;