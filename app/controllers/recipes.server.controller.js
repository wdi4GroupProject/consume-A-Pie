var Recipe = require('mongoose').model('Recipe');

module.exports = {
  all: function(req, res, next) {
    // User.findOne({_id:req.query.user_id}).exec(function(err,user){
    //   if(err) return next(err);
    //   var black_list = user.black_list;
    //   console.log(black_list);
    //   Recipe.find({_id:{$nin: black_list }}, function(err, recipes) {
    //     if (err) return next(err);
    //     res.json(recipes);
    //   });
    // });
    Recipe.findAllExcludeBlackList(req.query.user_id,function(err, recipes) {
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
  },
  adminall: function(req, res, next) {
    Recipe.find({}, function(err, recipes) {
      if (err) return next(err);
      res.json(recipes);
    });
  },
  new: function(req, res, next) {
    res.render('users/adminPOST', {
      title: 'Admins add recipes here'
    });
  },
  create: function(req, res, next) {
    var new_recipe = new Recipe(req.body);
    new_recipe.save(function(err) {
      if (err) return next(err);
      res.json(new_recipe);
      });


    // var new_recipe = new Recipe(req.body);
    // new_recipe.save(function(err){
    //   if(err) return next(err);
    //   res.json(new_recipe);
    // });

  }


};
