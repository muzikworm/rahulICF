


//app.post('/password_reset/:token', function(req, res){
exports.reset_pwd = function(req, res){
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
}
  
//});

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
