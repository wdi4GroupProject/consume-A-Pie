var mongoose = require('mongoose');

var mealSchema = new mongoose.Schema({

  day: {
    type: Date
  },
  meal_num: {
    type: Number
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  saved: {
    type: Boolean
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: {createdAt: 'created_at'}
});

//register the schema
var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
