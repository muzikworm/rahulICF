//----------------------Forum APIs-------------------------------
// app.get('/api/forum/listQuestions', function(req, res){
//   var cookie = cookieParser.JSONCookie("username");
//   var listQuestions = mongoose.model('forum', forumSchema);
//   listQuestions.find(function(err, result){
//     if(err) throw err;
//     res.end(JSON.stringify(result));
//   });
// });

// app.post('/api/forum', function(req, res){
//   var question = mongoose.model('forum',forumSchema);
//    console.log(req.body);
//    var forumData = new question(req.body);
//     forumData.save(function (err) {
//       if(err) throw err;
//       res.send("success");
//       console.log('Question inserted');
//     });
// });

// app.get('/api/delete/allQuestions', function (req, res){
//     var listQuestion = mongoose.model('forum', forumSchema);
//     listQuestion.remove(function(err, result){
//     if(err) throw err;
//     res.end("Question Deleted"); 
//   });
// });
// app.get('/api/delete/question/:title', function (req, res){
//     var listQuestion = mongoose.model('forum', forumSchema);
//     listQuestion.remove({title: req.params.title},function(err, result){
//     if(err) throw err;
//     res.end("Question Deleted"); 
//   });
// });
// app.get('/api/forum/listQuestions/:title', function (req, res){
//     var listQuestion = mongoose.model('forum', forumSchema);
//     listQuestion.findOne({title: req.params.title}, function(err, result){
//     if(err) throw err;
//     // console.log(JSON.stringify(result));
//     if(result !==null){
//       res.end(JSON.stringify(result));
//     }
//     else 
//       res.end("User not found");
//   });
// });

// app.post('/api/forum/postAnswer', function(req, res){
//   var answer = mongoose.model('answer',answerSchema);
//    console.log(req.body);
//    var answerData = new answer(req.body);
//     answerData.save(function (err,result) {
//       if(err) throw err;
//       res.send("success");
//       console.log(result);
//     });
// });

// app.get('/api/forum/listAnswers', function(req,res){
//   var getanswers = mongoose.model('answer', answerSchema);
//   getanswers.find(function(err, result){
//     if(err) throw err;
//     res.end(JSON.stringify(result));
//   });
// });

// app.get('/api/forum/listAnswers/:title', function(req,res){
//   var getanswers = mongoose.model('answer', answerSchema);
//   getanswers.find({title:req.params.title},function(err, result){
//     if(err) throw err;
//     if(result !==null){
//       res.end(JSON.stringify(result));
//     }
//     else 
//       res.end("Question not found");
//   });
// });

// app.get('/api/delete/allAnswers', function(req,res){
//   var getanswers = mongoose.model('answer', answerSchema);
//   getanswers.remove(function(err, result){
//     if(err) throw err;
//     res.end(JSON.stringify(result));
//   });
// });
// app.get('/api/delete/answer/:id', function(req,res){
//   var getanswers = mongoose.model('answer', answerSchema);
//   getanswers.remove({_id: req.params.id},function(err, result){
//     if(err) throw err;
//     res.end(JSON.stringify(result));
//   });
// });


// app.post('/api/forum/ansupvotes', function(req,res){
//   var upvote = mongoose.model('answer', answerSchema);
// upvote.findOneAndUpdate({_id: req.body._id}, {
//       $push: {upvotedBy : req.body.upvotedBy}
//     }, function(err,result){
//     if(err) throw err;
//     res.send("success");
//   }); 
// });
// app.post('/api/forum/ansdownvotes', function(req,res){
//   var downvote = mongoose.model('answer', answerSchema);
// downvote.findOneAndUpdate({_id: req.body._id}, {
//       $push: {downvotedBy : req.body.downvotedBy}
//     }, function(err,result){
//     if(err) throw err;
//     res.send("success");
//   }); 
// });
// app.post('/api/forum/ansdownvotes2', function(req,res){
  
//   var downvote = mongoose.model('answer', answerSchema);
// downvote.findOneAndUpdate({_id: req.body._id}, {
//       $pull: {downvotedBy : req.body.downvotedBy}
//     }, function(err,result){
//     if(err) throw err;
//     res.send("success");
//   }); 
// });
// app.post('/api/forum/ansupvotes2', function(req,res){
  
//   var upvote = mongoose.model('answer', answerSchema);
// upvote.findOneAndUpdate({_id: req.body._id}, {
//       $pull: {upvotedBy : req.body.upvotedBy}
//     }, function(err,result){
//     if(err) throw err;
//     res.send("success");
//   }); 
// });

// app.get('/api/forum/listQuestions/category/:category', function (req, res){
//     // console.log(req.params.category);
//     var listQuestion = mongoose.model('forum', forumSchema);
//     var bla = {};
//     bla[req.params.category]=true
//     listQuestion.find(bla, function(err, result){
//     if(err) throw err;
//     if(result !==null){
//       console.log(result);
//       res.end(JSON.stringify(result));
//     }
//     else 
//       res.end("User not found");
//   });
// });


// app.post('/api/forum/upvotes', function(req,res){
//   // console.log(req.body);
//   var upvote = mongoose.model('forum', forumSchema);
// upvote.findOneAndUpdate({_id: req.body._id}, {
//       $push: {upvotedBy : req.body.byUser}
//     }, function(err,result){
//     // console.log(result);
//     if(err) throw err;
//     res.send("success");
//     console.log("Upvoted");
//   }); 
// });
// app.post('/api/forum/upvotes2', function(req,res){
//   // console.log(req.body);
//   var upvote = mongoose.model('forum', forumSchema);
// upvote.findOneAndUpdate({_id: req.body._id}, {
//       $pull: {upvotedBy : req.body.byUser}
//     }, function(err,result){
//     // console.log(result);
//     if(err) throw err;
//     res.send("success");
//     console.log("Upvoted");
//   }); 
// });


// app.post('/api/forum/downvotes', function(req,res){
//   // console.log(req.body);
//   var downvote = mongoose.model('forum', forumSchema);
// downvote.findOneAndUpdate({_id: req.body._id}, {
//       $push: {downvotedBy : req.body.byUser}
//     }, function(err,result){
//     // console.log(result);
//     if(err) throw err;
//     res.send("success");
//     console.log("downvoted");
//   }); 
// });

// app.post('/api/forum/downvotes2', function(req,res){
//   // console.log(req.body);
//   var downvote = mongoose.model('forum', forumSchema);
// downvote.findOneAndUpdate({_id: req.body._id}, {
//       $pull: {downvotedBy : req.body.byUser}
//     }, function(err,result){
//     // console.log(result);
//     if(err) throw err;
//     res.send("success");
//     console.log("downvoted");
//   }); 
// });