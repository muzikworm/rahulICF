var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var forumSchema = mongoose.Schema({
  askedby: String,
  askedbyEmail : String,
  title: String,
  question: String,
  upvotedBy: [String],
  downvotedBy: [String],
  answers : String,
  category1: Boolean,
  category2: Boolean,
  category3: Boolean,
  category4: Boolean,
  category5: Boolean,
  category6: Boolean,
  category7: Boolean,
  category8: Boolean,
  date : String
})

module.exports = mongoose.model('forum', forumSchema);