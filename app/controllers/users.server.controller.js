var User = require('mongoose').model('User');
module.exports = {
  userPreference: function(req, res, next) {
    User.findOne({
      _id: req.query.id
    }, function(err, user) {
      if (err) return next(err);
      if (req.query.action == 'like') {
        user.favourite_list.push(req.query.recipe_id);
        user.save(function(err, user) {
          if (err) return next(err);
          res.send('The recipe has added to your favourite list');
        });
      }
      if (req.query.action == 'dislike') {
        user.black_list.push(req.query.recipe_id);
        user.save(function(err, user) {
          if (err) return next(err);
          res.send('The recipe has added to your black list');
        });
      }
    });
  }





};
