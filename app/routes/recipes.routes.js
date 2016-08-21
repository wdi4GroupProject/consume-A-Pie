module.exports =function(app){
  var recipesController=require('../controllers/recipes.server.controller');
  //get all recipes API url
  app.route('/API/recipes')
  .get(recipesController.all);
  //get a recipe by id API url
  app.route('/API/recipes/:id')
  .get(recipesController.show);
};
