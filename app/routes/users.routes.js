module.exports = function(app){
  var usersController = require('../controllers/users.server.controller');
  //like a recipe by  method "put" with pramas user's 'id' and 'recipe_id'
  app.route('/API/users?')
  .put(usersController.userPreference);

};
