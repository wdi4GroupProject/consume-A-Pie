var User = require('mongoose').model('User'),
  jwt = require('jsonwebtoken'),

  jwt_secret = 'wdi4team5jwtsecret';

module.exports = {
  userPreference: function(req, res, next) {
    User.findOne({
      _id: req.query.id
    }, function(err, user) {
      if (err) return next(err);
      if (req.query.action == 'like') {
        if (user.favourite_list.indexOf(req.query.recipe_id) == -1) {
          user.favourite_list.push(req.query.recipe_id);
          user.save(function(err, user) {
            if (err) return next(err);
            res.send('The recipe has added to your favourite list');
          });
        } else if (user.favourite_list.indexOf(req.query.recipe_id) !== -1) {
          var i = user.favourite_list.indexOf(req.query.recipe_id);
          user.favourite_list.splice(i, 1);
          user.save(function(err, user) {
            if (err) return next(err);
            res.send('The recipe has been removed from your favourite list');
          });
        }
      }
      if (req.query.action == 'dislike') {
        if (user.black_list.indexOf(req.query.recipe_id) == -1) {
          user.black_list.push(req.query.recipe_id);
          user.save(function(err, user) {
            if (err) return next(err);
            res.send('The recipe has added to your black list');
          });
        } else if (user.black_list.indexOf(req.query.recipe_id) !== -1) {
          var j = user.black_list.indexOf(req.query.recipe_id);
          user.black_list.splice(j, 1);
          user.save(function(err, user) {
            if (err) return next(err);
            res.send('The recipe has been removed from your black list');
          });
        }
      }
    });
  },
  preferenceList: function(req, res, next) {


    if (req.query.action == 'like') {
      User.findOne({
        _id: req.query.user_id
      }).populate('favourite_list').exec(function(err, user) {
        if (err) return next(err);
        res.json(user.favourite_list);
      });
    }
    if (req.query.action == 'dislike') {
      User.findOne({
        _id: req.query.user_id
      }).populate('black_list').exec(function(err, user) {
        if (err) return next(err);
        res.json(user.black_list);
      });

    }
  },
  signup: function(req, res, next) {
    User.findOne({
      "local.email": req.body.email
    }, function(err, user) {
      if (err) res.send(err);
      if (user) {
        res.status(403).send({
          message: 'this email has been taken!'
        });
      } else {
        var userObject = new User();
        userObject.local.email = req.body.email;
        userObject.local.password = req.body.password;
        userObject.save(function(err, user) {
          if (err) {
            return res.status(401).send(err);
          } else {
            var jwt_token = jwt.sign(payload, jwt_secret);
            var jsonObj = {
              "id": user._id,
              "token": jwt_token
            };

            return res.status(200).json(jsonObj);
          }
        });
      }

    });

  },
  login: function(req, res, next) {
    //validate user by email
    User.findOne({
      "local.email": req.body.email,
    }, function(err, user) {
      if (err) res.send(err);

      if (user) {
        //authenticate user by password
        user.authenticate(req.body.password, function(err, match_password) {
          if (match_password) {
            var payload = {
              id: user._id,
              email: user.local.email
            };
            console.log(user._id);
            var jwt_token = jwt.sign(payload, jwt_secret);
            var jsonObj = {
              "id": user._id,
              "token": jwt_token
            };

            return res.status(200).json(jsonObj);
          } else {
            res.status(401).send({
              message: 'Invalid password'
            });
          }

        });
      } else {
        res.status(401).send({
          message: 'User not founded'
        });
      }
    });
  },
  authentication: function(req, res, next) {
    res.status(200).send({
      message: 'ok'
    });
  }
};
