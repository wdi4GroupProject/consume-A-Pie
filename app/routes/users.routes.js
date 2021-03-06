module.exports = function(app){
  var usersController = require('../controllers/users.server.controller');
  //like or dislike a recipe by  method "put" with pramas user's 'id' and 'recipe_id' and 'aciton= like or dislike'
  app.route('/API/users?')
  .put(usersController.userPreference);

  app.route('/API/users/list?')
  .get(usersController.preferenceList);
  app.route('/API/signup')
  .post(usersController.signup);
  app.route('/API/login')
  .post(usersController.login);
  app.route('/API/authentication')
  .post(usersController.authentication);
  app.get('/API/logout', function(req, res) {
    req.logout();
    res.status(200).send({message:'logged out!'});
  });
};
