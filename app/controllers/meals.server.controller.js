var Meal = require('mongoose').model('Meal');
var Recipe = require('mongoose').model('Recipe');
module.exports = {
  create: function(req, res, next) {
    var meal = new Meal(req.body);
    meal.save(function(err) {
      if (err) return next(err);
      res.json(meal);
    });
  },
  addRecipes: function(req, res, next) {
      Meal.findOne({_id:req.params.id},function(err,meal){
        if(err) return next(err);
        meal.recipes.push(req.body.recipes);
        meal.save(function(err,meal){
          if(err) return next (err);
          res.json(meal);
        });
      });
  },
  showRecipes: function(req, res, next) {
    Meal.findOne({
      _id: req.params.id
    }, function(err, recipes) {
      if (err) return next(err);
      res.json(recipes);
    });
  },
  deleteRecipe: function(req, res, next) {
    Meal.findOne({
      _id: req.params.id
    }, function(err, meal) {
      if(err) return next(err);
      if(meal.recipes.length>0){
        meal.recipes.splice(req.body.recipe, 1);
        meal.save(function(err) {
          if(err) return next(err);
          res.json(meal);
        });
      }else {
        return res.send('You have not chosen any recipe.');
      }

    });
  },
  showMealsByDay: function(req,res,next){
    console.log(req.query.day);
    Meal.find({$and:[{'$where':'this.day.toJSON().slice(0,10)=='+req.query.day+''},{user_id:req.query.user_id}]},function(err,meals){
      if(err) return next(err);
      res.json(meals);
    });
  }
};
