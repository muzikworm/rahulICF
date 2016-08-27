var user = require('../models/user')

//app.post('/api/signup', function (req, res) {
   //var signup = mongoose.model('user',userSchema);
exports.signup = function(req, res){
    req.body.confirmation_code = Math.random().toString(36).substring(7);
   req.body.confirmed = 0;
   var userData = new user(req.body);

   user.findOne({email: req.body.email}, function(err, result){
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
      userData.save(function (err) {
      if(err) throw err;
      res.send("success");
      console.log('user inserted');
    });
    }
    else {
      res.send('signup failed');
    }
   });
}  
   
    
//});

//app.get('/email_verify/:confirmation_code', function(req, res){
exports.email_verify = function(req, res){
  
  user.findOneAndUpdate({ confirmation_code: req.params.confirmation_code }, { 
      confirmation_code : "",
      confirmed : 1
      },function(err,result) {
        console.log(result);
      });  

  res.sendFile(__dirname + '../public/index.html', function(err){
    if(err) 
      console.log(err);
  });
}
  
//});


//app.post('/api/login', function(req,res){
exports.login = function(req, res){
  //var loginUser = mongoose.model('user', userSchema);
  user.find({email: req.body.email},function(err, result){
    if(err) throw err;
    console.log(typeof result.length);
    if(result.length !== 0){
      //res.status(200).send({state: 'success', message: 'logged in successfully'});
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
      res.status(401).send({state: 'failure', message: 'wrong credentials'})
     // res.end("failed");
  });
}
   
//});