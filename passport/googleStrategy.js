const GoogleStrategy  = require('passport-google-oauth20').Strategy;
const passport        = require('passport');
const User            = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: '26157116953-jkcslqp72d4s97oprl94i19dd2uv82te.apps.googleusercontent.com',//GOOGLE_CLIENT_ID,
  clientSecret: 'S6GF7bIH9OzZgRSmzI-2zIFz',//GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ googleId: profile.id })
        .then(user => {
          if (user) return cb(null, user);
          return User.create(
            { 
            googleId: profile.id,
            profileImg: PushSubscriptionOptions.value,
            username: displayName
            }).then(newUser => {
            return cb(null, newUser);
          });
        })
        .catch(err => {
          cb(err);
        });
    }
));

//Google profile examp:

// { id: '112678934251205388903',
//   displayName: 'Stefan Culafic',
//   name: { familyName: 'Culafic', givenName: 'Stefan' },
//   photos:
//    [ { value:
//         'https://lh3.googleusercontent.com/-vN2r6OL7IHg/AAAAAAAAAAI/AAAAAAAAHcs/e27OZ_SW810/photo.jpg' } ],
//   provider: 'google',
//   _raw:
//    '{\n  "sub": "112678934251205388903",\n  "name": "Stefan Culafic",\n  "given_name": "Stefan",\n  "family_name": "Culafic",\n  "picture": "https://lh3.googleusercontent.com/-vN2r6OL7IHg/AAAAAAAAAAI/AAAAAAAAHcs/e27OZ_SW810/photo.jpg",\n  "locale": "en"\n}',
//   _json:
//    { sub: '112678934251205388903',
//      name: 'Stefan Culafic',
//      given_name: 'Stefan',
//      family_name: 'Culafic',
//      picture:
//       'https://lh3.googleusercontent.com/-vN2r6OL7IHg/AAAAAAAAAAI/AAAAAAAAHcs/e27OZ_SW810/photo.jpg',
//      locale: 'en' } }