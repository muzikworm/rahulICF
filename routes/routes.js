var signup = require('../controllers/signup'),
    pwdReset = require('../controllers/passwordReset'),
    user = require('../controllers/user'),
    userprofile = require('../controllers/userProfile'),
    contract = require('../controllers/contract'),
    invoice = require('../controllers/invoice'),
    trail = require('../controllers/trackStatus'),
    admin = require('../controllers/admin'),
    passport = require('passport'),
	requiresLogin = require('../controllers/requiresLogin'),
	passportAuth0 = require('../config/passport-auth0'),
	cookieParser = require('cookie-parser'),
	forum = require('../models/forum'),
	answer = require('../models/answer');
  var helper = require('sendgrid').mail;
var sg = require('sendgrid').SendGrid('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');
 module.exports = function(app, passport){

 // 	var router = express.Router();

	// var env = {
	//   AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
	//   AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
	//   AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
	// };

	// /* GET home page. */
	// router.get('/', function(req, res, next) {
	//   res.render('index', { title: 'Express', env: env });
	// });

	// router.get('/login',
	//   function(req, res){
	//     res.render('login', { env: env });
	//   });

 	// app.get('/callback',
	 //  passport.authenticate('auth0', { failureRedirect: '/failure' }),
	 //  function(req, res) {
	 //    if (!req.user) {
	 //      throw new Error('user null');
	 //    }
	 //    res.send({state: 'success'})
	 //    //res.redirect(__dirname + '../public/index.html');
	 // });

 	// app.get('/failure', function(req, res){
 	// 	res.send({state: 'failure'})
 	// })

 	 app.post('/api/signup', signup.signup)
 	 // app.post('/api/signup', function(req, res){
 	 // 	passport.authenticate('user-signup' , function(err, user, info) {
	 //      if(err){
	 //        res.send(500, err)
	 //      }
	 //      if (user === false) {
	 //        // handle login error ...
	 //       console.log('user1 = '+user)
	 //        res.json({state: 'failure', user: null, message: info});
	 //      } else {
	 //      	console.log('user2 = '+user)
	 //        // handle successful login ...
	 //        res.json({state: 'success', user: user || null, message: info});
	 //      }
	 //    })(req, res);
 	// })
 	app.get('/email_verify/:confiramtion_code', signup.email_verify)
 	
 	app.post('/api/login', function(req, res, next){
 			console.log(req.body)
 			 passport.authenticate('user-login' , function(err, user, info) {
		      if(err){
		        res.send(500, err)
		      }
		      if (user === false) {
		        // handle login error ...
		        res.json({state: 'failure', user: null, message: info});
		      } else {
		        // handle successful login ...
		        res.json({state: 'success', user: user || null, message: info});
		      }
		    })(req, res, next)
	  	
 		}
	)
 	app.post('/password_reset/:token', pwdReset.reset_pwd)
 	app.post('/forgotpass', pwdReset.forgotpass)

 	app.get('/api/listcontracts/:email', user.listcontracts)
 	app.delete('/api/deleteContract', user.delete_contract)

 	app.post('/api/profile', userprofile.update_profile)
 	app.post('/api/photo', userprofile.upload_pic)

 	app.post('/api/contract', contract.save_contract)

 	app.post('/api/invoice', invoice.save_invoice)

 	//trails
 	app.post('/api/invitation', trail.send_invitation)
 	app.post('/api/firstView', trail.first_view)
 	app.post('/api/sign', trail.contract_signed)

 	//admin
 	app.get('/api/listcontracts', admin.listcontracts)
 	//----------------------Forum APIs-------------------------------
app.get('/api/forum/listQuestions', function(req, res){
  var cookie = cookieParser.JSONCookie("username");
  //var listQuestions = new forum()
  forum.find(function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});

app.post('/api/forum', function(req, res){
  //var question = new forum()
   //console.log(req.body);
   var forumData = new forum(req.body);
    forumData.save(function (err) {
      if(err) throw err;
      res.send("success");
      console.log('Question inserted');
    });
});

app.get('/api/delete/allQuestions', function (req, res){
    forum.remove(function(err, result){
    if(err) throw err;
    res.end("Question Deleted"); 
  });
});
app.get('/api/delete/question/:title', function (req, res){
    forum.remove({title: req.params.title},function(err, result){
    if(err) throw err;
    res.end("Question Deleted"); 
  });
});
app.get('/api/forum/listQuestions/:title', function (req, res){
    forum.findOne({title: req.params.title}, function(err, result){
    if(err) throw err;
    // console.log(JSON.stringify(result));
    if(result !==null){
      res.end(JSON.stringify(result));
    }
    else 
      res.end("User not found");
  });
});

app.post('/api/forum/postAnswer', function(req, res){
   var answerData = new answer(req.body.answerData);
   var emailto=req.body.emailto;


    answerData.save(function (err,result) {
      if(err) throw err;
      res.send("success");
      console.log(result);
    });
            var sendgrid = require("sendgrid")("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");
            var email = new sendgrid.Email();

            email.addTo(emailto);
            email.setFrom("indiancreativeforum@gmail.com");
            email.setSubject("Sending with SendGrid is Fun");
            email.setHtml("and easy to do anywhere, even with Node.js");

            sendgrid.send(email);
});

app.get('/api/forum/listAnswers', function(req,res){
  answer.find(function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});

app.get('/api/forum/listAnswers/:title', function(req,res){
  answer.find({title:req.params.title},function(err, result){
    if(err) throw err;
    if(result !==null){
      res.end(JSON.stringify(result));
    }
    else 
      res.end("Question not found");
  });
});

app.get('/api/delete/allAnswers', function(req,res){
  answer.remove(function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});
app.get('/api/delete/answer/:id', function(req,res){
  answer.remove({_id: req.params.id},function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});


app.post('/api/forum/ansupvotes', function(req,res){
  var upvote = new answer()
upvote.findOneAndUpdate({_id: req.body._id}, {
      $push: {upvotedBy : req.body.upvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});
app.post('/api/forum/ansdownvotes', function(req,res){
  var downvote = new answer()
downvote.findOneAndUpdate({_id: req.body._id}, {
      $push: {downvotedBy : req.body.downvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});
app.post('/api/forum/ansdownvotes2', function(req,res){
  
  var downvote = new answer()
downvote.findOneAndUpdate({_id: req.body._id}, {
      $pull: {downvotedBy : req.body.downvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});
app.post('/api/forum/ansupvotes2', function(req,res){
  
  var upvote = new answer()
upvote.findOneAndUpdate({_id: req.body._id}, {
      $pull: {upvotedBy : req.body.upvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});

app.get('/api/forum/listQuestions/category/:category', function (req, res){
    // console.log(req.params.category);
    //var listQuestion = new forum()
    var bla = {};
    bla[req.params.category]=true
    forum.find(bla, function(err, result){
    if(err) throw err;
    if(result !==null){
      console.log(result);
      res.end(JSON.stringify(result));
    }
    else 
      res.end("User not found");
  });
});


app.post('/api/forum/upvotes', function(req,res){
  // console.log(req.body);
  var upvote = new forum()
upvote.findOneAndUpdate({_id: req.body._id}, {
      $push: {upvotedBy : req.body.byUser}
    }, function(err,result){
    // console.log(result);
    if(err) throw err;
    res.send("success");
    console.log("Upvoted");
  }); 
});
app.post('/api/forum/upvotes2', function(req,res){
  // console.log(req.body);
  var upvote = new forum()
upvote.findOneAndUpdate({_id: req.body._id}, {
      $pull: {upvotedBy : req.body.byUser}
    }, function(err,result){
    // console.log(result);
    if(err) throw err;
    res.send("success");
    console.log("Upvoted");
  }); 
});


app.post('/api/forum/downvotes', function(req,res){
  // console.log(req.body);
  var downvote = new forum()
downvote.findOneAndUpdate({_id: req.body._id}, {
      $push: {downvotedBy : req.body.byUser}
    }, function(err,result){
    // console.log(result);
    if(err) throw err;
    res.send("success");
    console.log("downvoted");
  }); 
});

app.post('/api/forum/downvotes2', function(req,res){
  // console.log(req.body);
  var downvote = new forum()
downvote.findOneAndUpdate({_id: req.body._id}, {
      $pull: {downvotedBy : req.body.byUser}
    }, function(err,result){
    // console.log(result);
    if(err) throw err;
    res.send("success");
    console.log("downvoted");
  }); 
});
 }
