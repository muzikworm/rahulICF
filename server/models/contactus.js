var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var contactusSchema = mongoose.Schema({
  name : String,
  email : String,
  subject : String,
  message: String
});

module.exports = mongoose.model('contact', contactusSchema);