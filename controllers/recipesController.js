const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const { handleValidateOwnership } = require('../middleware/custom_errors');

const Recipes = require('../models/Recipes');

// Getting all Recipes
router.get('/', async function(req, res, next) {
    try {
        const recipes = await Recipes.find({});
        if (recipes) {
            res.status(200).json(recipes);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;