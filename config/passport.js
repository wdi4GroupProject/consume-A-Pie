var LocalStrategy = require('passport-local').Strategy;

// load user model
var User = require('../app/models/user.model');

module.exports = function(passport) {

  // passport session setup required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      // asynchronous
      // User.findOne wont invoke unless data is sent back
      process.nextTick(function() {
        User.findOne({
          'local.email': email
        }, function(err, user) {
          // if there are any errors, return the error
          if (err)
            return next(err);

          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            var newUser = new User();
            newUser.local.email = email;
            newUser.local.password = password;
            // save the user
            newUser.save(function(err) {
              if (err) {
                return res.status(401).send(err);
              } else {
                return done(null, newUser);
              }
            });
          }
        });
      });
    }));

  // LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      // see if the user trying to login already exists
      User.findOne({
        'local.email': email
      }, function(err, user) {
        if (err) return next(err);
        // if the user is found
        if (user) {
          //authenticate user by password
          user.authenticate(password, function(err, match_password) {
            if (match_password) {
              //send jwt token to authorized user
              // var payload = {
              //   id: user.id,
              //   email: user.email
              // };
              // // var expiryObj = {
              // //   expiresIn: '10h'
              // // };
              // var jwt_token = jwt.sign(payload, jwt_secret);
              return done(null, user);
            } else {
              return done(null, false, req.flash('loginMessage', ' Wrong password.'));
            }
          });
        } else {
          // if no user is found, return the message
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
      });
    }));

};
