var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/user')

passport.serializeUser(function(user, done) {
    //tell passport which id to be use
    console.log('serializing user:', user._id);
    return done(null, user._id);
  });

  passport.deserializeUser(function(id, done){
    //return user object back
    User.findById(id, function(err, user){
            if(err) {
                return done(err, false);
            }
            if(!user){
                return done('user not found', false);
            }
            //we found the user object provide it back to passport
            return  done(user, true);
        })
  });
// exports.user_login = function(req,res){
  // Use local strategy
  passport.use('user-login', new LocalStrategy({
      passReqToCallback : true,
      usernameField: 'email',
      passwordField: 'password'
    },
    function (req, email, password, done) {
      User.findOne({'email' : email}, 
      function (err, user) {
        if (err) {
          return done(err);
        }
       if(!user) {
              console.log('User not found with the email ',+email);
              return done(null, false, 'User not found with the email');
            }
      else if (!user.validPassword(password))
          return done(null, false,  'Oops! Wrong password.');
        

        return done(null, user);
      });
    }
  ));
// }

// exports.user_signup = function(req, res){

   passport.use('user-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (req, email, password, done) {
      //console.log(req)
          
      User.findOne({
        email : email
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        else if(user){
          console.log('user = '+user)
          return done('email already exist', false);
          
        }
        else if(!user){
          //var user = new User()
          user.fname = req.body.fname;
          user.lname = req.body.lname;
          user.password = user.generateHash(password)
          user.createdDate = new Date();
          user.confirmation_code = Math.random().toString(36).substring(7)
          user.confirmed = 0
          user.save(function(err){
            if(err)
              console.err(err);
            return done('successfully signed up', user);
          })

          //sending mail
          user.findOne({email: req.body.email}, function(err, result){
          if(result == null) {
            from_email = new helper.Email("indiancreativeforum@gmail.com");
            to_email = new helper.Email(req.body.email);
            subject = "Email Confirmation";
            content = new helper.Content("text/html", "Thank you for signing up. Please click the link below to verify your email. <a href='https://localhost:35725/email_verify/"+user.confirmation_code+"'>Verify Email</a>. ");
            mail = new helper.Mail(from_email, subject, to_email, content);
            var requestBody = mail.toJSON()
            var request = sg.emptyRequest()
            request.method = 'POST'
            request.path = '/v3/mail/send'
            request.body = requestBody
            sg.API(request, function (response) {
            })
          //   userData.save(function (err) {
          //   if(err) throw err;
          //   res.send("success");
          //   console.log('user inserted');
          // });
          }
          // else {
          //   res.send('signup failed');
          // }
         });
      }
        //}
      });
    }
  ));

// /}
