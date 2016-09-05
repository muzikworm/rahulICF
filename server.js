//----------------Import models-----------------------------------------
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require("fs");
var multer = require("multer");
var mkdirp = require("mkdirp");
var bcrypt = require("bcrypt-nodejs");
var cookieParser = require('cookie-parser');
var morgan  = require('morgan'),
passport = require('passport');
var strategy = require('./config/passport-auth0.js');
var session = require('express-session');
var dotenv = require('dotenv');
dotenv.load();
//----------------Add express middleware layers------------------------

// app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
// require('./controllers/passport')(passport); // pass passport for configuration
app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: '8vQUStZ-nx3xoM_xdxK3T9BvjzfKO05GIcaL2Xy8ylmX-NO_I3S2CYcOwo4OSx7p', resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes.js')(app, passport);
//----------------File Upload middleware--------------------------------
var photoUpload = function(req,res,dir){
  mkdirp(__dirname + dir, function(err) { 

     if(err){
        console.log(err);
     }

  });

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {

      callback(null, req.body.path);
    },
    filename: function (req, file, callback) {
      callback(null, req.body.name + '.jpg');
    }
  });
  var upload = multer({ storage : storage}).single('userPhoto');

  upload(req,res,function(err) {
        if(err) {
            return res.end(toString(err));
        }
        
        res.end();
    });
}
//-----------------Create connection-------------------------------------
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// var db = mongoose.connect("mongodb://aaw:aaw@ds023684.mlab.com:23684/cooper");
// // var db = mongoose.connect("mongodb://localhost:27017/cooper");
// if(db){
//   console.log("connected to Database");
// }
// else{
//   console.log("Some error")
// }


app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});

//----------------------Static Directory-----------------------------
app.use(express.static(__dirname + '/public'));

//-----------------------Default Page----------------------------

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html', function(err){
    if(err) 
      console.log(err);
  });
});




//----------------Create localhost at port 27017----------------------
var server = app.listen(process.env.PORT || 35725, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Cooper listening at %s",port);
});