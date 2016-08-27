//----------------Import models-----------------------------------------

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require("fs");
var multer = require("multer");
var mkdirp = require("mkdirp");
var bcrypt = require("bcrypt-nodejs");
var cookieParser = require('cookie-parser');
var helper = require('sendgrid').mail
var sg = require('sendgrid').SendGrid('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');

//----------------Add express middleware layers------------------------

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//----------------File Upload middleware--------------------------------
var photoUpload = function(req,res,dir){
  mkdirp(__dirname + dir, function(err) { 

     if(err){
        console.log(err);
     }

  });

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {

      callback(null, req.body.path);
    },
    filename: function (req, file, callback) {
      callback(null, req.body.name + '.jpg');
    }
  });
  var upload = multer({ storage : storage}).single('userPhoto');

  upload(req,res,function(err) {
        if(err) {
            return res.end(toString(err));
        }
        
        res.end();
    });
}
//-----------------Create connection-------------------------------------
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// var db = mongoose.connect("mongodb://aaw:aaw@ds023684.mlab.com:23684/cooper");
// // var db = mongoose.connect("mongodb://localhost:27017/cooper");
// if(db){
//   console.log("connected to Database");
// }
// else{
//   console.log("Some error")
// }


app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});

//---------------------Schemas---------------------------------

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

var passwordResetSchema = mongoose.Schema({
  email : String,
  token : String
});

var contractSchema = mongoose.Schema({
  	isSigned              : {type : Boolean, default : false},
    isSent                : {type : Boolean, default : false},
    isAccepted            : {type: Boolean, default : false},
    isViewed              : {type: Boolean, default : false},
    place                 : String,
    contractDate          : Date,
    startDate             : Date,
    endDate               : Date,
    client                : String,
    clientOwnership       : String,
    clientCompany         : String,                    // useless, remove later  //offererCompany
    freelancer            : String,
    freelanceCompany      : String,                    // useless, remove later  // AcceptorCompany
    freelanceTitle        : String,
    freelanceOwnership    : String,
    workSubject           : String,
    description           : String,
    iterations            : Number,
    iterationFee          : Number,
    fee                   : Number,
    feeType               : String,
    proratedType          : String,
    advancePayment        : Number,
    milestone             : Object,
    latePayment           : Number,
    expenses              : String,
    currency              : String,
  //username              : String,
    email                 : String,
    owernship             : String,
    termination           : String,
    agreement             : String,
    agreement2            : String,
    terminationDays       : Number,
    paymentDays           : Number,
    invoiceDays           : Number,
    terminationFee        : String,
    ipMade                : String,
    acceptor              : String,
    acceptorIP            : String,
    acceptorSignature     : String,
    acceptorSignatureDate : Date,
    acceptorViewDate      : Date,
    acceptorEmail         : String,
    acceptorCompany       : String,
    offerer               : String,
    offererIP             : String,
    offererSignature      : String,
    offererSignatureDate  : Date,
    offererEmail          : String,
    offererCompany        : String,
    addendum              : String,
    viewDate              : Date,  // date when acceptor views the contract for the first time
    viewIP                : String //ip when first viewed by the acceptor
})

var invoiceSchema = mongoose.Schema({
  paid : {type : Boolean, default : false},
	client : String,
	clientCompany : String,
	clientOwnership : String,
	freelancer : String,
	freelanceTitle : String,
	freelanceCompany : String,
	freelanceOwnership : String,
	issueDate : Date,
	dueDate : Date,
	workSubject : String,
	iterations : Number,
	iterationFee : Number,
	lineTotal : Number,
	subtotal : Number,
	total : Number,
	advancePayment : Number,
  currency : String,
	discount : Number,
	lateFee : Number
})

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

var answerSchema = mongoose.Schema({
  title : String,
  answer : String,
  answerBy : String,
  answerByEmail : String,
  upvotedBy : [String],
  downvotedBy : [String],
  date : String
});

var requestEmails = mongoose.Schema({
  email : String
})

var feedbackSchema = mongoose.Schema({
  name : String,
  email : String,
  feedback : String
})

var contactusSchema = mongoose.Schema({
  name : String,
  email : String,
  subject : String,
  message: String
});

//-----------------Password Hashing----------------
// userSchema.pre('save',function(next){
//       var user = this;
//       //if(!user.isModified('password')) return;

//       bcrypt.hash(user.password,null,null,function(err,hash){
//         if (err) {
//           console.log(err);
//           next(err);
//           return;
//         }
//         else{
//           user.password = hash;
//           console.log(hash);
//           next();
//         }
//       });

//   });
//------------------ get client's ip---------------
function getip(req){
    var ip = req.headers['x-forwarded-for'] || 
       req.connection.remoteAddress || 
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;

    return ip;
}

//-----------------Add user-----------------------------------------
app.use(cookieParser());

app.post('/api/signup', function (req, res) {
   var signup = mongoose.model('user',userSchema);
   req.body.confirmation_code = Math.random().toString(36).substring(7);
   req.body.confirmed = 0;
   var signupData = new signup(req.body);

   signup.findOne({email: req.body.email}, function(err, result){
    if(result == null) {
      from_email = new helper.Email("indiancreativeforum@gmail.com");
      to_email = new helper.Email(req.body.email);
      subject = "Email Confirmation";
      content = new helper.Content("text/html", "Thank you for signing up. Please click the link below to verify your email. <a href='https://localhost:35725/email_verify/"+req.body.confirmation_code+"'>Verify Email</a>. ");
      mail = new helper.Mail(from_email, subject, to_email, content);
      var requestBody = mail.toJSON()
      var request = sg.emptyRequest()
      request.method = 'POST'
      request.path = '/v3/mail/send'
      request.body = requestBody
      sg.API(request, function (response) {
      })
      signupData.save(function (err) {
      if(err) throw err;
      res.send("success");
      console.log('user inserted');
    });
    }
    else {
      res.send('signup failed');
    }
   });
    
});

app.get('/api/getip/',function(req,res){
  //console.log(req.headers['x-forwarded-for'])
  res.end(getip(req));
});
app.post('/api/postip',function(req,res){
  var User = mongoose.model('user', userSchema);

  User.findOneAndUpdate({ email: req.body.email }, { 
            lastIP : req.body.ip
          }, function(err,user) {
            if (err) throw err;
            res.send("success");
            console.log("Ip changed: ",user,"<--------------------------->");

          });
});

app.post('/api/login', function(req,res){
  var loginUser = mongoose.model('user', userSchema);
  loginUser.find({email: req.body.email},function(err, result){
    if(err) throw err;
    console.log(typeof result.length);
    if(result.length !== 0){
      res.end("success");
      // bcrypt.compare(req.body.password, result.password, function(err, valid) {
      //   if (!valid) {
      //     res.end("failed")
      //   }
      //   else{
      //     if(!result.confirmed) {
      //       res.end("verify_email");
      //     }
      //     else {
      //     res.end("success");
      //     }
      //   }
      // });
    }
    else
      res.end("failed");
  }); 
});

app.get('/api/listUsers', function(req, res){
	var cookie = cookieParser.JSONCookie("username");
	var listUsers = mongoose.model('user', userSchema);
	listUsers.find(function(err, result){
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.get('/api/delete/allUsers', function (req, res){
    var listUsers = mongoose.model('user', userSchema);
    listUsers.remove(function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});


app.get('/api/listUsers/:email', function(req,res){
	var listUsers = mongoose.model('user', userSchema);
	listUsers.findOne({email: req.params.email}, function(err, result){
		if(err) throw err;
		if(result !==null){
			res.end(JSON.stringify(result));
		}
		else 
			res.end("User not found");
	});
});

app.get('/api/verified', function(req,res){
  var listVUsers = mongoose.model('user', userSchema);
  listVUsers.find({verified : true}, function(err, result){
    if(err) throw err;
    if(result !==null){
      res.end(JSON.stringify(result));
    }
    else 
      res.end("User not found");
  });
});

app.post('/api/contract', function (req, res) {
  
   var contract = mongoose.model('contract',contractSchema);
   data = req.body;
   data.ipMade = getip(req);
   data.offererIP = getip(req);
   var contractData = new contract(data);
   // console.log(contractData);
    contractData.save(function (err) {
      if(err) throw err;
      res.send({"status":"success","id":contractData._id});
      console.log('form created');
    });
});

app.post('/api/invoice', function (req, res) {
  
   var invoice = mongoose.model('invoice',invoiceSchema);
   var invoiceData = new invoice(req.body);
   // console.log(invoiceData);
    invoiceData.save(function (err) {
      if(err) throw err;
      res.send("success");
      console.log('Invoice created');
    });
});

//--------------Profile & Settings----------------
app.post('/api/profile', function (req, res) {
    console.log(req.body);
    var User = mongoose.model('user', userSchema);
    if (req.body.password != null){
      User.findOneAndUpdate({ email: req.body.email }, { 
          email : req.body.email,
          password : req.body.password,
          fname : req.body.fname,
          lname : req.body.lname,
          cname : req.body.cname,
          title : req.body.title,
          country : req.body.country,
          city : req.body.city,
          vatid : req.body.vatid,
          currency : req.body.currency,
          bio : req.body.bio
          }, function(err, user) {
            if (err) throw err;
            res.send("success");
                  console.log(user);
          });
    }
    else{
      User.findOneAndUpdate({ email: req.body.email }, { 
          email : req.body.email,
          fname : req.body.fname,
          lname : req.body.lname,
          cname : req.body.cname,
          title : req.body.title,
          country : req.body.country,
          city : req.body.city,
          vatid : req.body.vatid,
          currency : req.body.currency,
          bio : req.body.bio
          }, function(err, user) {
            if (err) throw err;
            res.send("success");
                  console.log(user);
          });     
    }
});

// app.get('/api/profile/:email', function (req, res) {
    
//     var user = mongoose.model('user', userSchema);
//     user.findOne({email: req.params.email}, function(err, result){
//     if(err) throw err;
//     if(result !==null){
//       res.end(JSON.stringify(result));
//     }
//     else 
//       res.end("User not found");
//   });
// });

//-------------------------------------------------------
//app.use(express.cookieParser('my secret here'));

app.get('/api/listcontracts', function(req, res){

    var listContracts = mongoose.model('contract', contractSchema);
    listContracts.find(function(err, result){
      if(err) throw err;
      res.end(JSON.stringify(result));
    });
});

app.get('/api/listcontracts/:email', function(req, res){

    var listContracts = mongoose.model('contract', contractSchema);
    listContracts.find({email : req.params.email}, function(err, result){
      if(err) throw err;
      res.end(JSON.stringify(result));
    });
});

app.get('/api/listcontracts/:reftype/:refobj', function(req,res){
  console.log(req.params);
  var listContracts = mongoose.model('contract', contractSchema);
  if(req.params.reftype  == 'email'){
      listContracts.find({ email : req.params.refobj}, function(err, result){
        if(err) throw err;
        if(result !==null){
          res.end(JSON.stringify(result));
        }
        else 
          res.end("Contract not found");
      });
  }
  else if (req.params.reftype == 'id') {
      listContracts.findOne({ _id : req.params.refobj}, function(err, result){
        if(err){ //throw err;
          res.status(400).send('Contract Not Found');
          res.end("Contract Not Found")
        }
        if(result !==null){
          res.end(JSON.stringify(result));
        }
        else {
           res.status(400).send('Contract Not Found');
        }
      });  
  }
});


//-------------Profile Photo Upload-------------------

app.post('/api/photo',function(req,res){
    photoUpload(req, res, './public/uploads/user/', function(err) {
        if(err) {
            return res.end(toString(err));
        }
    });
});

app.post('/api/mail',function(req,res){
  console.log(req.body)
  var contract = mongoose.model('contract', contractSchema);
  contract.findOneAndUpdate({ _id: req.body._id }, { 
      isSent : true,
      }, function(err, contract) {
        if (err) throw err;
        res.end("success");
              console.log("Contract Has Been Sent");
      });
    from_email = new helper.Email("indiancreativeforum@gmail.com");
  	to_email = new helper.Email(req.body.destId);
  	subject = "Contract Invitation";
  	content = new helper.Content("text/html", "Hello,you have recieved a contract Invitation from "+req.body.sender+"<br><a href='https://cooper-aaw.herokuapp.com/signContract/"+req.body._id+"'>Please review and Sign it:</a>");
  	mail = new helper.Mail(from_email, subject, to_email, content);
  	var requestBody = mail.toJSON()
    var request = sg.emptyRequest()
    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = requestBody
    sg.API(request, function (response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })
    
});

app.post('/api/requestmail', function(req, res){
  var request = mongoose.model('request', requestEmails);
  var newrequest = new request(req.body);
  newrequest.save(function(err){
    if(err) throw err;
    res.send('success');
  });
  from_email = new helper.Email("indiancreativeforum@gmail.com");
  to_email = new helper.Email(req.body.email);
  subject = "Invitation to test TRANXACT";
  content = new helper.Content("text/html", "Hello, we've received your req, get back to you soon.");
  mail = new helper.Mail(from_email, subject, to_email, content);
  var requestBody = mail.toJSON()
  var request = sg.emptyRequest()
  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = requestBody
  sg.API(request, function (response) {
  })
});

app.post('/api/feedback', function(req, res){
  var feedback = mongoose.model('feedback', feedbackSchema);
  var newFeedback = new feedback(req.body);
  newFeedback.save(function(err){
    if(err) throw err;
    res.send('success');
  });
  from_email = new helper.Email("indiancreativeforum@gmail.com");
  to_email = new helper.Email(req.body.email);
  subject = "New Feedback";
  content = new helper.Content("text/html", "Hello, we've received your feedback. Thanks for the same.");
  mail = new helper.Mail(from_email, subject, to_email, content);
  var requestBody = mail.toJSON()
  var request = sg.emptyRequest()
  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = requestBody
  sg.API(request, function (response) {
  })
});

app.post('/api/contactus', function(req,res){
  var contactus = mongoose.model('contactus', contactusSchema);
  var newcontactus = new contactus(req.body);
  newcontactus.save(function(err){
    if(err) throw err;
    res.send('success');
  });
  from_email = new helper.Email("indiancreativeforum@gmail.com");
  to_email = new helper.Email(req.body.email);
  subject = req.body.subject;
  content = new helper.Content("text/html", "Hello, we've received your message. We'll get back to you shortly.");
  mail = new helper.Mail(from_email, subject, to_email, content);
  var requestBody = mail.toJSON()
  var request = sg.emptyRequest()
  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = requestBody
  sg.API(request, function (response) {
  })
});


//--------------Delete contract-----------
app.post('/api/deleteContract',function(req,res){
	console.log("Deleting: ",req.body._id)
	id = req.body._id;
	var contract = mongoose.model('contract', contractSchema);
	contract.remove({ _id: id }, function (err) {
	  if (err) throw(err);
	  res.end("success")
	  // removed!
	});

})

//-------------------First View------------------------
app.post('/api/firstView',function(req,res){

  var contract = mongoose.model('contract', contractSchema);
  ip = getip(req);
  console.log(req.body.ip);
  contract.findOneAndUpdate({ _id: req.body._id }, { 
      viewIP : ip,
      viewDate : new Date(),
      isViewed : true
      }, function(err, contract) {
        if (err) throw err;
        res.json({'contract': contract, 'status' : "success" });
      });
    
});//-------------------Sign------------------------
app.post('/api/sign',function(req,res){

  var contract = mongoose.model('contract', contractSchema);
  ip = getip(req);
  console.log(req.body,ip);
  contract.findOneAndUpdate({ _id: req.body._id }, { 
      acceptorIP : ip,
      acceptorSignatureDate : new Date(),
      acceptorSignature : req.body.acceptorSignature,
      isAccepted : true,
      }, function(err, contract) {
        if (err) throw err;
        res.json({'contract': contract, 'status' : "success" });
              // console.log(contract.acceptorIP);
      });
    
});




//----------------------Forum APIs-------------------------------
app.get('/api/forum/listQuestions', function(req, res){
  var cookie = cookieParser.JSONCookie("username");
  var listQuestions = mongoose.model('forum', forumSchema);
  listQuestions.find(function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});

app.post('/api/forum', function(req, res){
  var question = mongoose.model('forum',forumSchema);
   console.log(req.body);
   var forumData = new question(req.body);
    forumData.save(function (err) {
      if(err) throw err;
      res.send("success");
      console.log('Question inserted');
    });
});

app.get('/api/delete/allQuestions', function (req, res){
    var listQuestion = mongoose.model('forum', forumSchema);
    listQuestion.remove(function(err, result){
    if(err) throw err;
    res.end("Question Deleted"); 
  });
});
app.get('/api/delete/question/:title', function (req, res){
    var listQuestion = mongoose.model('forum', forumSchema);
    listQuestion.remove({title: req.params.title},function(err, result){
    if(err) throw err;
    res.end("Question Deleted"); 
  });
});
app.get('/api/forum/listQuestions/:title', function (req, res){
    var listQuestion = mongoose.model('forum', forumSchema);
    listQuestion.findOne({title: req.params.title}, function(err, result){
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
  var answer = mongoose.model('answer',answerSchema);
   console.log(req.body);
   var answerData = new answer(req.body);
    answerData.save(function (err,result) {
      if(err) throw err;
      res.send("success");
      console.log(result);
    });
});

app.get('/api/forum/listAnswers', function(req,res){
  var getanswers = mongoose.model('answer', answerSchema);
  getanswers.find(function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});

app.get('/api/forum/listAnswers/:title', function(req,res){
  var getanswers = mongoose.model('answer', answerSchema);
  getanswers.find({title:req.params.title},function(err, result){
    if(err) throw err;
    if(result !==null){
      res.end(JSON.stringify(result));
    }
    else 
      res.end("Question not found");
  });
});

app.get('/api/delete/allAnswers', function(req,res){
  var getanswers = mongoose.model('answer', answerSchema);
  getanswers.remove(function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});
app.get('/api/delete/answer/:id', function(req,res){
  var getanswers = mongoose.model('answer', answerSchema);
  getanswers.remove({_id: req.params.id},function(err, result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});


app.post('/api/forum/ansupvotes', function(req,res){
  var upvote = mongoose.model('answer', answerSchema);
upvote.findOneAndUpdate({_id: req.body._id}, {
      $push: {upvotedBy : req.body.upvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});
app.post('/api/forum/ansdownvotes', function(req,res){
  var downvote = mongoose.model('answer', answerSchema);
downvote.findOneAndUpdate({_id: req.body._id}, {
      $push: {downvotedBy : req.body.downvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});
app.post('/api/forum/ansdownvotes2', function(req,res){
  
  var downvote = mongoose.model('answer', answerSchema);
downvote.findOneAndUpdate({_id: req.body._id}, {
      $pull: {downvotedBy : req.body.downvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});
app.post('/api/forum/ansupvotes2', function(req,res){
  
  var upvote = mongoose.model('answer', answerSchema);
upvote.findOneAndUpdate({_id: req.body._id}, {
      $pull: {upvotedBy : req.body.upvotedBy}
    }, function(err,result){
    if(err) throw err;
    res.send("success");
  }); 
});


// app.post('/api/forum/answers', function(req,res){
//   // console.log(req.body);
//   var answer = mongoose.model('forum', forumSchema);
//   answer.findOneAndUpdate({_id: req.body._id}, { 
//       $push: {
//         answers : {
//           answerField: req.body.answerField,
//           answerBy: req.body.answerBy
//         }
//       }
//     }, function(err,result){
//     console.log(result);
//     if(err) throw err;
//     res.send("success");
//   }); 
// });



// app.get('/api/forum/listQuestions/:id', function (req, res){
//     var listQuestion = mongoose.model('forum', forumSchema);
//     listQuestion.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, result){
//     if(err) throw err;
//     // console.log(JSON.stringify(result));
//     if(result !==null){
//       res.end(JSON.stringify(result));
//     }
//     else 
//       res.end("User not found");
//   });
// });
app.get('/api/forum/listQuestions/category/:category', function (req, res){
    // console.log(req.params.category);
    var listQuestion = mongoose.model('forum', forumSchema);
    var bla = {};
    bla[req.params.category]=true
    listQuestion.find(bla, function(err, result){
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
  var upvote = mongoose.model('forum', forumSchema);
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
  var upvote = mongoose.model('forum', forumSchema);
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
  var downvote = mongoose.model('forum', forumSchema);
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
  var downvote = mongoose.model('forum', forumSchema);
downvote.findOneAndUpdate({_id: req.body._id}, {
      $pull: {downvotedBy : req.body.byUser}
    }, function(err,result){
    // console.log(result);
    if(err) throw err;
    res.send("success");
    console.log("downvoted");
  }); 
});

app.get('/email_verify/:confirmation_code', function(req, res){

  var user = mongoose.model('user', userSchema);
  user.findOneAndUpdate({ confirmation_code: req.params.confirmation_code }, { 
      confirmation_code : "",
      confirmed : 1
      },function(err,result) {
        console.log(result);
      });  

  res.sendFile(__dirname + '/public/index.html', function(err){
    if(err) 
      console.log(err);
  });
});


app.post('/password_reset/:token', function(req, res){

  var user = mongoose.model('user', userSchema);
  user.findOneAndUpdate({ confirmation_code: req.params.confirmation_code }, { 
      confirmation_code : "",
      confirmed : 1
      },function(err,result) {
        console.log(result);
      });  

  res.sendFile(__dirname + '/public/index.html', function(err){
    if(err) 
      console.log(err);
  });
});

app.post('/forgotpass', function(req, res){
  var user = mongoose.model('user', userSchema);
  var password_reset = mongoose.model('password_reset',passwordResetSchema);
  user.findOne({email: req.body.email}, function(err, result){
    if(result != null) {
      var token = Math.random().toString(36).substring(7);
      var resetData = new password_reset({email:req.body.email,token:token})
      resetData.save();
      from_email = new helper.Email("indiancreativeforum@gmail.com");
      to_email = new helper.Email(req.body.email);
      subject = "Reset Password";
      content = new helper.Content("text/html", "Click the link below to reset your password. <a href='http://localhost:35725/reset_password/"+token+"'>Reset Passowrd</a>. ");
      mail = new helper.Mail(from_email, subject, to_email, content);
      var requestBody = mail.toJSON()
      var request = sg.emptyRequest()
      request.method = 'POST'
      request.path = '/v3/mail/send'
      request.body = requestBody
      sg.API(request, function (response) {
      })
    }
    else {
      res.send('Email not found');
    }
   });

  
});


app.post('/password_reset', function(req, res){
  var user = mongoose.model('user', userSchema);
  var password_reset = mongoose.model('password_reset',passwordResetSchema);
  password_reset.findOne({token: req.body.token}, function(err, result){
    if(result != null) {
      user.findOneAndUpdate({ email: result.email }, { 
        password : req.body.password
        },function(err,result) {
          console.log(result);
        });  
      res.send("success")
    }
    else {
      res.send('Token not found');
    }
   });

  
});



//----------------------Static Directory-----------------------------
app.use(express.static(__dirname + '/public'));

//-----------------------Default Page----------------------------

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html', function(err){
    if(err) 
      console.log(err);
  });
});




//----------------Create localhost at port 27017----------------------
var server = app.listen(process.env.PORT || 35725, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Cooper listening at %s",port);
});