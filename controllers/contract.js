var contract = require('../models/contract')
// app.post('/api/contract', function (req, res) {

function getip(req){
    var ip = req.headers['x-forwarded-for'] || 
       req.connection.remoteAddress || 
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;

    return ip;
}
exports.save_contract = function(req, res){
  //var contract = mongoose.model('contract',contractSchema);
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
}  
   
// });