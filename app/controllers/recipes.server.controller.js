var Recipe = require('mongoose').model('Recipe');
module.exports = {
  all: function(req, res, next) {
    Recipe.find({}, function(err, recipes) {
      if (err) return next(err);
      res.json(recipes);
    });
  },
  show: function(req, res, next) {
    var id = req.params.id;
    Recipe.findOne({
      _id: id
    }, function(err, recipe) {
      if (err) return next(err);
      res.json(recipe);
    });
  }
};
