var mongoose = require('mongoose'); 
var bcrypt = require('bcrypt-nodejs'); 

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  fname : String,
  lname : String,
  cname : String,
  title : String,
  email : String,
  password : String,
  createdDate: String,
  profilepic: String,    //profile pic
  lastIP : String,
  country : String,
  city : String,
  vatid : String,   //
  currency : String,
  bio : String,
  confirmation_code: String,
  confirmed: Boolean
});

userSchema.methods.validPassword = function (password) {
  //return this.AdminPassword === password;
 // return password == this.password;
  return bcrypt.compareSync(password, this.password);

};

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('users', userSchema);
