const GoogleStrategy  = require('passport-google-oauth20').Strategy;
const passport        = require('passport');
const User            = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"//http://localhost:3000
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
