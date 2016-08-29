var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  fname : String,
  lname : String,
  cname : String,
  title : String,
  email : String,
  password : String,
  profilepic: String,    //?
  lastIP : String,
  country : String,
  city : String,
  vatid : String,   //?
  currency : String,
  bio : String,
  confirmation_code: String,
  confirmed: Boolean
});

module.exports = mongoose.model('users', userSchema);
