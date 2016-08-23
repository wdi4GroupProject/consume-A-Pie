var config = require('./config'),
  mongoose = require('mongoose');
  mongoose.Promise = global.Promise;

module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/user.model');
  require('../app/models/recipe.model');
  require('../app/models/meal.model');
  return db;
};
