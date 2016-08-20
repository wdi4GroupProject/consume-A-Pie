var mongoose = require('mongoose');

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

},
{
  timestamps: {} }
);

//register the schema
var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
