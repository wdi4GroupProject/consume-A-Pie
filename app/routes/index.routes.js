module.exports = function(app,passport){
  var staticPageController = require('../controllers/staticpage.server.controller');

  app.get('/',staticPageController.renderHome);
  // app.get('/login', staticPageController.renderLogin);
  // app.post('/login', staticPageController.authLogin);
  // app.get('/signup', staticPageController.renderSignup);
  // app.post('/signup',staticPageController.doSignup);

};
