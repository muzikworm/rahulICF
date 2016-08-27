var signup = require('../controllers/signup'),
    pwdReset = require('../controllers/passwordReset');

 module.exports = function(app){

 	app.post('/signup', signup.signup);
 	app.get('email_verify', signup.email_verify);
 	app.post('/login', signup.login);
 }
