var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var answerSchema = mongoose.Schema({
  title : String,
  answer : String,
  answerBy : String,
  answerByEmail : String,
  upvotedBy : [String],
  downvotedBy : [String],
  date : String
});

module.exports = mongoose.model('answer', answerSchema);