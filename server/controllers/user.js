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

