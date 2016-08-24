var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var recipeSchema = new mongoose.Schema({

  title: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  source_id: {
    type: String,
    trim: true
  },
  ingredients: {
    type: String,
    trim: true
  },
  image_url: {
    type: String,
    trim: true
  },
  directions: {
    type: String,
    trim: true
  },
  total_calories: {
    type: Number,
    trim: true
  }

}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

recipeSchema.statics.findAllExcludeBlackList = function(user_id, callback) {
  var that = this;
  User.findOne({
    _id: user_id
  }).exec(function(err, user) {
    if (err) return next(err);
    var black_list = user.black_list;
    that.find({
      _id: {
        $nin: black_list
      }
    }, callback);
  });
};

//register the schema
var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
