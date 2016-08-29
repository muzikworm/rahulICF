var invoice = require('../models/invoice')

// app.post('/api/invoice', function (req, res) {
exports.save_invoice = function(req, res){
//var invoice = mongoose.model('invoice',invoiceSchema);
   var invoiceData = new invoice(req.body);
   // console.log(invoiceData);
    invoiceData.save(function (err) {
      if(err) throw err;
      res.send("success");
      console.log('Invoice created');
    });
}  
   
// });