const GitHubStrategy = require('passport-github').Strategy;
const passport          = require('passport');
const User              = require('../models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://opinion-news.herokuapp.com/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ githubId: profile.id })
    .then(user => {
      console.log(profile);
      if (user) return cb(null, user);
      return User.create(
        { 
          githubId: profile.id,
          username: profile.login,
          profileImg: profile.avatar_url,
          
        }).then(newUser => {
        return cb(null, newUser);
      });
    })
  .catch(err => {
    cb(err);
  });
}
));
