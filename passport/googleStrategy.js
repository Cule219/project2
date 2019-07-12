const GoogleStrategy  = require('passport-google-oauth20').Strategy;
const passport        = require('passport');
const User            = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://opinion-news.herokuapp.com/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ googleId: profile.id })
        .then(user => {
          if (user) return cb(null, user);
          return User.create(
            { 
            googleId: profile.id,
            profileImg: profile.photos.value,
            username: profile.displayName
            }).then(newUser => {
            return cb(null, newUser);
          });
        })
        .catch(err => {
          cb(err);
        });
    }
));
