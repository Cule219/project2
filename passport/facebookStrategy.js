const FacebookStrategy  = require("passport-facebook").Strategy;
const passport          = require('passport');
const User              = require('../models/User');

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookId: profile.id }).then(user => {
      if (user) return cb(null, user);
      return User.create({
        facebookId: profile.id,
        fullName: profile.displayName
      }).then(newUser => {
        return cb(null, newUser);
      });
    }).catch(err => {
      cb(err);
    });
  }
));