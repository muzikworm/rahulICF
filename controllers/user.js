var contract = require('../models/contract')
// app.get('/api/listcontracts/:email', function(req, res){

    // var listContracts = mongoose.model('contract', contractSchema);
    // listContracts.find({email : req.params.email}, function(err, result){
    //   if(err) throw err;
    //   res.end(JSON.stringify(result));
    // });
// });

// app.get('/api/listcontracts/:reftype/:refobj', function(req,res){
exports.listcontracts = function(req, res){
  console.log(req.params);
  //var listContracts = mongoose.model('contract', contractSchema);
  if(req.params.reftype  == 'email'){
      contract.find({ email : req.params.refobj}, function(err, result){
        if(err) throw err;
        if(result !==null){
          res.end(JSON.stringify(result));
        }
        else 
          res.end("Contract not found");
      });
  }
  else if (req.params.reftype == 'id') {
      contract.findOne({ _id : req.params.refobj}, function(err, result){
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
}  
  
// });

//--------------Delete contract-----------
//app.post('/api/deleteContract',function(req,res){
exports.delete_contract = function(req, res){
  console.log("Deleting: ",req.body._id)
  id = req.body._id;
 // var contract = mongoose.model('contract', contractSchema);
  contract.remove({ _id: id }, function (err) {
    if (err) throw(err);
    res.end("success")
    // removed!
  });

}  
  
//})