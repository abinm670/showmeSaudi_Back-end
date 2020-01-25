// require necessary NPM Packages
const express =require('express'); 

//Instantiate a Router 

const router = express.Router();


router.get('/', function(req, res)
{
    res.json({
        message:'welcome to ShowMeSaudi Express App'
    });
});

//Export the Router so we can use it in the server.js file

module.exports = router; 
