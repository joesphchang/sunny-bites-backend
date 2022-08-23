// mongoose
const mongoose = require('../db/connection');

// Schema
const RecipesSchema = new mongoose.Schema(
    {
	title: { type: String, required: true, unique: true },
	creator: String,
	ingredients: { type: Array },
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg',
	},
	description: String, 
    prep: { type: Number, min: 0},
	duration: { type: Number, min: 0 },
	created: { type: Date, default: Date.now },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        },    
    }, 
    {
        timestamps: true,
    }
);

const Recipes = mongoose.model('Recipes', RecipesSchema);

module.exports = Recipes;