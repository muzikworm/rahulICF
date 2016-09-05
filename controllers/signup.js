var user = require('../models/user')
var helper = require('sendgrid').mail
var sg = require('sendgrid').SendGrid('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');
var passport = require('./passport')
//app.post('/api/signup', function (req, res) {
   //var signup = mongoose.model('user',userSchema);
exports.signup = function(req, res){
    // req.body.confirmation_code = Math.random().toString(36).substring(7);
    // req.body.confirmed = 0;
     var userData = new user();
    userData.fname = req.body.fname;
    userData.lname = req.body.lname;
    userData.email = req.body.email;
    userData.password = userData.generateHash(req.body.password)
    userData.confirmation_code = Math.random().toString(36).substring(7);
    userData.createdDate = new Date();

  

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
        if(err)
          console.log(err)
        else if(result){
          res.send({state: 'success'})
          console.log(result);
        } else
          res.send({state: 'failure', message: 'wrong code'})
        
      });  
}
  
exports.login = function(req, res){

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
    })(req, res, next);

  // user.findOne({email: req.body.email},
  //   function(err, u){
  //     if(err) throw err;
  //     else if(u){
  //       if(u.password == u.validPassword(req.body.password)){
  //         res.status(200).send({state: 'success', message: 'logged in successfully'})
  //       } else{
  //         res.status(200).send({state: 'success', message: 'wrong password'})
  //       }
  //     }
  //     else
  //     res.status(401).send({state: 'failure', message: 'wrong credentials'})
  //    // res.end("failed");
  // });
}
   
