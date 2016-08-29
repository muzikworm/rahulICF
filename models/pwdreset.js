var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var passwordResetSchema = mongoose.Schema({
  email : String,
  token : String
});

module.exports = mongoose.model('pwdreset', passwordResetSchema);