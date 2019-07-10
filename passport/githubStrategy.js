const GitHubStrategy = require('passport-github').Strategy;
const passport          = require('passport');
const User              = require('../models/User');

passport.use(new GitHubStrategy({
  clientID: 'Iv1.8a5c9b2c57e1734e',//GITHUB_CLIENT_ID,
  clientSecret: 'fb2629852475cf7606a89a2376de89ddc0beb860',//GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
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



//github profile:
// { login: 'Cule219',
//      id: 14827650,
//      node_id: 'MDQ6VXNlcjE0ODI3NjUw',
//      avatar_url: 'https://avatars3.githubusercontent.com/u/14827650?v=4',
//      gravatar_id: '',
//      url: 'https://api.github.com/users/Cule219',
//      html_url: 'https://github.com/Cule219',
//      followers_url: 'https://api.github.com/users/Cule219/followers',
//      following_url:
//       'https://api.github.com/users/Cule219/following{/other_user}',
//      gists_url: 'https://api.github.com/users/Cule219/gists{/gist_id}',
//      starred_url:
//       'https://api.github.com/users/Cule219/starred{/owner}{/repo}',
//      subscriptions_url: 'https://api.github.com/users/Cule219/subscriptions',
//      organizations_url: 'https://api.github.com/users/Cule219/orgs',
//      repos_url: 'https://api.github.com/users/Cule219/repos',
//      events_url: 'https://api.github.com/users/Cule219/events{/privacy}',
//      received_events_url: 'https://api.github.com/users/Cule219/received_events',
//      type: 'User',
//      site_admin: false,
//      name: 'Stefan',
//      company: null,
//      blog: '',
//      location: null,
//      email: null,
//      hireable: null,
//      bio: null,
//      public_repos: 59,
//      public_gists: 0,
//      followers: 0,
//      following: 0,
//      created_at: '2015-09-24T20:25:18Z',
//      updated_at: '2019-06-19T13:43:44Z' } }