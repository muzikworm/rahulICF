var signup = require('../controllers/signup'),
    pwdReset = require('../controllers/passwordReset'),
    user = require('../controllers/user'),
    userprofile = require('../controllers/userProfile'),
    contract = require('../controllers/contract'),
    invoice = require('../controllers/invoice'),
    trail = require('../controllers/trackStatus'),
    admin = require('../controllers/admin'),
    passport = require('passport'),
	requiresLogin = require('../controllers/requiresLogin'),
	passportAuth0 = require('../config/passport-auth0');
 module.exports = function(app, passport){

 // 	var router = express.Router();

	// var env = {
	//   AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
	//   AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
	//   AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
	// };

	// /* GET home page. */
	// router.get('/', function(req, res, next) {
	//   res.render('index', { title: 'Express', env: env });
	// });

	// router.get('/login',
	//   function(req, res){
	//     res.render('login', { env: env });
	//   });

 	app.get('/callback',
	  passport.authenticate('auth0', { failureRedirect: '/failure' }),
	  function(req, res) {
	    if (!req.user) {
	      throw new Error('user null');
	    }
	    res.send({state: 'success'})
	    //res.redirect(__dirname + '../public/index.html');
	 });

 	app.get('/failure', function(req, res){
 		res.send({state: 'failure'})
 	})

 	 app.post('/api/signup', signup.signup)
 	// app.post('/api/signup', function(req, res){
 	// 	passport.authenticate('user-signup' , function(err, user, info) {
	 //      if(err){
	 //        res.send(500, err)
	 //      }
	 //      if (user === false) {
	 //        // handle login error ...
	 //       console.log('user1 = '+user)
	 //        res.json({state: 'failure', user: null, message: info});
	 //      } else {
	 //      	console.log('user2 = '+user)
	 //        // handle successful login ...
	 //        res.json({state: 'success', user: user || null, message: info});
	 //      }
	 //    })(req, res);
 	// })
 	app.get('/email_verify/:confiramtion_code', signup.email_verify)
 	
 	app.post('/api/login', function(req, res, next){
 			//console.log(req.body)
 			 passport.authenticate('user-login' , function(err, user, info) {
		      if(err){
		        res.send(500, err)
		      }
		      if (user === false) {
		        // handle login error ...
		        res.json({state: 'failure', user: null, message: info});
		      } else {
		        // handle successful login ...
		        res.json({state: 'success', user: user || null, message: info});
		      }
		    })(req, res, next)
	  	
 		}
	)
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
