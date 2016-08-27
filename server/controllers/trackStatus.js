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

function getip(req){
    var ip = req.headers['x-forwarded-for'] || 
       req.connection.remoteAddress || 
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;

    return ip;
}
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
