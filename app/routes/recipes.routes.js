module.exports =function(app){
  var recipesController = require('../controllers/recipes.server.controller');
  //get all recipes API url
  app.route('/API/recipes')
  .get(recipesController.all);

  app.route('/recipe')
  .get(recipesController.adminall);

  app.get('/recipe/new', recipesController.new);


  //get a recipe by id API url
  app.route('/API/recipes/:id')
  .get(recipesController.show);
};
