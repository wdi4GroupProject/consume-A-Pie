module.exports =function(app){
  var mealsController=require('../controllers/meals.server.controller');
  //create a new meal API url
  app.route('/API/meals')
  .post(mealsController.create);
  //add recipe to a meal API by a method of 'put'; show a particular recipe of a meal by a method of 'get'
  app.route('/API/meals/:id')
  .put(mealsController.addRecipes)
  .get(mealsController.showRecipes)
  .delete(mealsController.deleteRecipe);

  //show meals on a selected day by a method of'get' with parameters 'day' and 'user_id'
  app.route('/API/meals?')
  .get(mealsController.showMealsByDay);

};
