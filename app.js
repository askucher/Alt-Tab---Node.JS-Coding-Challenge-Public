'use strict';

let express = require('express');
let app = express();
var Joi = require('joi');
let bodyParser = require('body-parser');
let expressSession = require('express-session')
let db = require('diskdb');




app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json 
app.use(bodyParser.json());
db.connect('./db', ['users', 'sessions']);
app.set('trust proxy', 1) // trust first proxy 
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));


/* Models */
var commonContext = {db, app}

let session = require("./models/session")(commonContext);



/* Controllers */

var controllerContext = {db, app, session}

var controllers = {
    login:    require("./controllers/login")(controllerContext),
    register: require("./controllers/register")(controllerContext),
    profile:  require("./controllers/profile")(controllerContext)
}

/* Registered Controllers */

app.post('/api/register', controllers.register);
app.post('/api/login'   , controllers.login);
app.get( '/api/profile' , controllers.profile);



module.exports = app;