'use strict'

//Creating a base name for MongoDB

const mongooseBaseName = 'showmeSaudiapp'

//URI formats for defining connections 
//between applications and MongoDB
// create the mongoDB URI for 

const database = {
    development: `mongodb://localhost/${mongooseBaseName}--development`, 
    test: `mongodb://localhost/${mongooseBaseName}--test`}

//identify if the development enevirment is test or development
//select DB based on wheather a test file was executed 
//before `server.js`
const localDB = process.env.TESTENV ? database.test : database.development


//envirment variable MONGODB_URI will be available in 
//Heroku production enveroment other wise use the Test
// or Development
const currentDB = process.env.MONGODB_URI || localDB

//export the appropriate database based on the curent env

module.exports = currentDB; 

