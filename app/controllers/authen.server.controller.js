// var LocalStrategy = require('passport-local').Strategy,
//   GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
//   FacebookStrategy = require('passport-facebook').Strategy,
//   TwitterStrategy = require('passport-twitter').Strategy,
//   GithubStrategy = require('passport-github2').Strategy;
//
// var User = require('../app/models/user.model'),
//   authConfig = require('../../config/auth');
//
// module.exports = function(passprot) {
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
//
//   // used to deserialize the user
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
//   // LOCAL SIGNUP
//   passport.use('local-signup', new LocalStrategy({
//       usernameField: 'email',
//       passwordField: 'password',
//       passReqToCallback: true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) {
//       // asynchronous
//       // User.findOne wont invoke unless data is sent back
//       process.nextTick(function() {
//         User.findOne({
//           'local.email': email
//         }, function(err, user) {
//           // if there are any errors, return the error
//           if (err)
//             return next(err);
//
//           // check to see if theres already a user with that email
//           if (user) {
//             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//           } else {
//             var newUser = new User();
//             newUser.local.email = email;
//             newUser.local.password = password;
//             // save the user
//             newUser.save(function(err) {
//               if (err) {
//                 return res.status(401).send(err);
//               } else {
//                 return done(null, newUser);
//               }
//             });
//           }
//         });
//       });
//     }));







// };
