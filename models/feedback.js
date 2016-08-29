var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var feedbackSchema = mongoose.Schema({
  name : String,
  email : String,
  feedback : String
})

module.exports = mongoose.model('feedback', feedbackSchema);
