const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const { handleValidateOwnership } = require('../middleware/custom_errors');

const Recipes = require('../models/Recipes');

// Getting all Recipes
router.get('/', async function (req, res, next) {
	try {
		const recipes = await Recipes.find({});
		if (recipes) {
			res.status(200).json(recipes);
		} else {
			return res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Get one recipe by ID
router.get('/:id', async (req, res, next) => {
	try {
		const recipe = await Recipes.findById(req.params.id);
		if (recipe) {
			res.status(200).json(recipe);
		} else {
			return res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Create a new Recipe with User connected
router.post('/', requireToken, async (req, res, next) => {
	try {
		const newRecipe = await Recipes.create({
			...req.body,
			owner: req.user._id,
		});
		if (newRecipe) {
			res.status(201).json(newRecipe);
		} else {
			return res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Update a Recipe only by User
router.put('/:id', requireToken, async (req, res, next) => {
	try {
		const recipeToUpdate = await Recipes.findById(req.params.id);
		if (recipeToUpdate) {
			const recipe = handleValidateOwnership(req, recipeToUpdate);
			recipe.set({ ...req.body, owner: req.user._id }).save();
			res.status(202).json(recipe);
		} else {
			return res.sendStatus(406);
		}
	} catch (error) {
		next(error);
	}
});

// Delete an recipe by id
router.delete('/:id', requireToken, async (req, res, next) => {
	try {
		const deletedRecipe = await Recipes.findById({
			_id: req.params.id,
		});
		if (deletedRecipe) {
			const recipe = handleValidateOwnership(req, deletedRecipe);
			recipe.remove();
			res.json(recipe);
		}
	} catch (error) {
		res.status(error.statusCode || 405).send(error.message);
	}
});

// Search recipes by title
router.get('/search/:title', async (req, res, next) => {
	try {
		const regexTitle = new RegExp(req.params.title);
		const searchRecipe = await Recipes.find({
			title: { $regex: regexTitle, $options: 'i' },
		});
		if (searchRecipe) {
			res.status(200).json(searchRecipe);
		} else {
			return res.sendStatus(405);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
