var LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  TwitterStrategy = require('passport-twitter').Strategy,
  GithubStrategy = require('passport-github2').Strategy;

var User = require('../app/models/user.model'),
  authConfig = require('./auth');

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

  //GOOGLE LOGIN
  passport.use(new GoogleStrategy({
      //pass in all the required data from ./config/auth
      clientID: authConfig.googleAuth.clientID,
      clientSecret: authConfig.googleAuth.clientSecret,
      callbackURL: authConfig.googleAuth.callbackURL,
      passReqToCallback: true //allow us to pass req data to the following function
    },
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        //check if user is already logged in
        if (!req.user) {
          //user.findOne wont invoke till we get all data from Google
          User.findOne({
            'google.id': profile.id
          }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, user);
            } else {
              //if the user is not found,create and store into database
              var newUser = new User();
              newUser.google.id = profile.id;
              newUser.google.token = token;
              newUser.google.name = profile.displayName;
              newUser.google.email = profile.emails[0].value;

              newUser.save(function(err) {
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        } else {
          //link up accounts for existing and logged in user
          var user = req.user;

          //update current user
          user.google.id = profile.id;
          user.google.token = token;
          user.google.name = profile.displayName;
          user.google.email = profile.emails[0].value;

          user.save(function(err) {
            if (err) return done(err);
            return done(null, user);
          });
        }

      });
    }
  ));

  //FACEBOOK LOGIN
  passport.use(new FacebookStrategy({
      //pass in required data from ./config/auth
      clientID: authConfig.facebookAuth.clientID,
      clientSecret: authConfig.facebookAuth.clientSecret,
      callbackURL: authConfig.facebookAuth.callbackURL,
      profileFields: ['id', 'displayName', 'email'],
      passReqToCallback: true //allow us to pass req data to the following function
    },
    //callback to receive data from facebookAuth
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        if (!req.user) {
          User.findOne({
            'facebook.id': profile.id
          }, function(err, user) {
            if (err) return done(err);
            if (user) {
              // if(!user.facebook.token){
              //
              // }
              return done(null, user);
            } else {
              var newUser = new User();
              newUser.facebook.id = profile.id;
              newUser.facebook.token = token;
              newUser.facebook.name = profile.displayName;
              newUser.facebook.email = profile.emails[0].value;

              newUser.save(function(err) {
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        } else {
          //link up accounts for existing and logged in user
          var user = req.user;

          //update current user
          user.facebook.id = profile.id;
          user.facebook.token = token;
          user.facebook.name = profile.displayName;
          user.facebook.email = profile.emails[0].value;

          user.save(function(err) {
            if (err) return done(err);
            return done(null, user);
          });
        }

      });
    }
  ));

  //TWITTER
  passport.use(new TwitterStrategy({
      consumerKey: authConfig.twitterAuth.consumerKey,
      consumerSecret: authConfig.twitterAuth.consumerSecret,
      callbackURL: authConfig.twitterAuth.callbackURL,
      passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      process.nextTick(function() {
        if (!req.user) {
          User.findOne({
            'twitter.id': profile.id
          }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, user);
            } else {
              var newUser = new User();

              newUser.twitter.id = profile.id;
              newUser.twitter.token = token;
              newUser.twitter.username = profile.username;
              newUser.twitter.displayName = profile.name;

              newUser.save(function(err) {
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        } else {
          //link up accounts for existing and logged in user
          var user = req.user;

          //update current user
          user.twitter.id = profile.id;
          user.twitter.token = token;
          user.twitter.username = profile.username;
          user.twitter.displayName = profile.displayName;

          user.save(function(err) {
            if (err) return done(err);
            return done(null, user);
          });
        }

      });
    }
  ));

  //Github
  passport.use(new GithubStrategy({
      clientID: authConfig.githubAuth.clientID,
      clientSecret: authConfig.githubAuth.clientSecret,
      callbackURL: authConfig.githubAuth.callbackURL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        if (!req.user) {
          User.findOne({
            'github.id': profile.id
          }, function(err, user) {
            if (err) return done(err);
            if (user) {
                console.log(profile);
              return done(null, user);
            } else {
              var newUser = new User();
              console.log(profile);
              newUser.github.id = profile.id;
              newUser.github.token = accessToken;
              newUser.github.username = profile.username;
              newUser.github.name = profile.displayName;

              newUser.save(function(err) {
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        } else {
          //link up accounts for existing and logged in user
          var user = req.user;

          //update current user
          user.github.id = profile.id;
          user.github.token = accessToken;
          user.github.username = profile.username;
          user.github.name = profile.displayName;

          user.save(function(err) {
            if (err) return done(err);
            return done(null, user);
          });
        }

      });
    }
  ));




};
