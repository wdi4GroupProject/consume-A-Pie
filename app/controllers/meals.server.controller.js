var Meal = require('mongoose').model('Meal');
module.exports = {
  create: function(req, res, next) {
    var day = new Date(req.body.day);
    Meal.find({
      $and: [{
        day: day
      }, {
        user_id: req.body.user_id
      }]
    }).exec(function(err, meals) {
      if (err) return next(err);
      var meal_num = meals.length+1;
      var meal = new Meal(req.body);
      meal.meal_num = meal_num;
      meal.save(function(err) {
        if (err) return next(err);
        res.json(meal);
    });

  });
  },
  addRecipes: function(req, res, next) {
    Meal.findOne({
      _id: req.params.id
    }, function(err, meal) {
      if (err) return next(err);
      meal.recipes.push(req.body.recipes);
      meal.save(function(err, meal) {
        if (err) return next(err);
        res.json(meal);
      });
    });
  },
  showRecipes: function(req, res, next) {
    Meal.findOne({
      _id: req.params.id
    }).populate('recipes').exec(function(err, recipes) {
      if (err) return next(err);
      res.json(recipes);
    });
  },
  deleteRecipe: function(req, res, next) {
    Meal.findOne({
      _id: req.params.id
    }, function(err, meal) {
      if (err) return next(err);
      if (meal.recipes.length > 0) {
        meal.recipes.splice(req.body.recipe, 1);
        meal.save(function(err) {
          if (err) return next(err);
          res.json(meal);
        });
      } else {
        return res.send('You have not chosen any recipe.');
      }

    });
  },
  deleteMeal:function(req,res,next){
    Meal.remove({
      _id: req.query.id
    }, function(err, meal) {
      if (err) return next(err);
      res.json({
        message: "Successfully deleted"
      });
    });
  },
  showMealsByDay: function(req, res, next) {
    var start_date = new Date(req.query.start),
      end_date = new Date(req.query.end);

    Meal.find({
      $and: [{
        "day": {
          $gte: start_date,
          $lte: end_date
        }
      }, {
        user_id: req.query.user_id
      }]
    }).populate('recipes').exec(function(err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
    // Meal.find(
    //   {$and:[
    //     {'$where':'this.day.toJSON().slice(0,10)=='+req.query.day+''},
    //     {user_id:req.query.user_id}]
    //   },
    //   function(err,meals){
    //   if(err) return next(err);
    //   res.json(meals);
    // });
  }
};
