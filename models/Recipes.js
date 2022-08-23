// mongoose
const mongoose = require('../db/connection');

// Schema
const RecipesSchema = new mongoose.Schema(
    {
	title: { type: String, required: true, unique: true },
	ingredients: { type: Array },
	cuisine: { type: String, required: true },
	dishType: {
		type: String,
	},
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg',
	},
    prep: { type: Number, min: 0},
	duration: { type: Number, min: 0 },
	creator: { type: String },
	created: { type: Date, default: Date.now },
    }
);

const Recipes = mongoose.model('Recipes', RecipesSchema);

module.exports = Recipes;