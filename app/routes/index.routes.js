module.exports = function(app,passport){
  var staticPageController = require('../controllers/staticpage.server.controller');

  app.get('/',staticPageController.renderHome);


};
