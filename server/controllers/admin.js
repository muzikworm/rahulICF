
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

app.get('/api/listcontracts', function(req, res){

    var listContracts = mongoose.model('contract', contractSchema);
    listContracts.find(function(err, result){
      if(err) throw err;
      res.end(JSON.stringify(result));
    });
});
