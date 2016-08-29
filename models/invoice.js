var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var invoiceSchema = mongoose.Schema({
  paid : {type : Boolean, default : false},
	client : String,
	clientCompany : String,
	clientOwnership : String,
	freelancer : String,
	freelanceTitle : String,
	freelanceCompany : String,
	freelanceOwnership : String,
	issueDate : Date,
	dueDate : Date,
	workSubject : String,
	iterations : Number,
	iterationFee : Number,
	lineTotal : Number,
	subtotal : Number,
	total : Number,
	advancePayment : Number,
  currency : String,
	discount : Number,
	lateFee : Number
})

module.exports = mongoose.model('invoices', invoiceSchema);