// Models
const Recipe = require('../models/Recipes');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Seed Data
const recipeSeed = require('./seed.json');
const userSeed = require('./seedUser.json');

Recipe.deleteMany({})
    .then(() => {
        console.log('Deleted all the recipes!');
        User.deleteMany({});
    })
    .then(() => {
        console.log('Deleted all the users!');
    })
    .then(() => {
        return Promise.all(
            userSeed.map(async (users) => {
                const password = await bcrypt.hash(users.password, 10);
                return { email: users.email, password: password};
            })
        );
    }) 
    .then((user) => {
        return User.insertMany(user);
    })
    .then((newUser) => {
        console.log('Created a new user!', newUser);
        return recipeSeed.map((recipes) => {
            const random = Math.floor(Math.random() * userSeed.length);
            return { ...recipes, owner: newUser[random]._id };
        });
    })
    .then((recipes) => {
        return Recipe.insertMany(recipes);
    })
    .then((newRecipe) => {
        console.log('We just created new recipes!', newRecipe);
    })
    .catch(console.error)
    .finally(() => {
        process.exit();
    });