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
