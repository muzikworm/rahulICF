var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'cooper.auth0.com',
    clientID:     'G8OF6ncy47aQC8XxYhLRs9NHSXLZfggJ',
    clientSecret: '8vQUStZ-nx3xoM_xdxK3T9BvjzfKO05GIcaL2Xy8ylmX-NO_I3S2CYcOwo4OSx7p',
    callbackURL:  'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;