var signup = require('../controllers/signup'),
    pwdReset = require('../controllers/passwordReset'),
    user = require('../controllers/user'),
    userprofile = require('../controllers/userProfile'),
    contract = require('../controllers/contract'),
    invoice = require('../controllers/invoice'),
    trail = require('../controllers/trackStatus'),
    admin = require('../controllers/admin');

 module.exports = function(app){

 	app.post('/api/signup', signup.signup)
 	app.get('/email_verify', signup.email_verify)
 	app.post('/api/login', signup.login)

 	app.post('/password_reset/:token', pwdReset.reset_pwd)
 	app.post('/forgotpass', pwdReset.forgotpass)

 	app.get('/api/listcontracts/:email', user.listcontracts)
 	app.delete('/api/deleteContract', user.delete_contract)

 	app.post('/api/profile', userprofile.update_profile)
 	app.post('/api/photo', userprofile.upload_pic)

 	app.post('/api/contract', contract.save_contract)

 	app.post('/api/invoice', invoice.save_invoice)

 	//trails
 	app.post('/api/invitation', trail.send_invitation)
 	app.post('/api/firstView', trail.first_view)
 	app.post('/api/sign', trail.contract_signed)

 	//admin
 	app.get('/api/listcontracts', admin.listcontracts)
 }
