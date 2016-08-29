var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var requestEmails = mongoose.Schema({
  email : String
})

module.exports = mongoose.model('requests', requestEmails);
