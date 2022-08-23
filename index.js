// Instantiate Express
const express = require('express');
// Instantiate Cors
const cors = require('cors');
// Instantiate app
const app = express();
// Request Loggers and Custom Errors
const request_logger = require('./middleware/request_logger');
const { handleErrors } = require('./middleware/custom_errors');

app.set('port', process.env.PORT || 3000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(request_logger);

// Routes

// Redirect
app.get('/', function(req, res) {
    res.redirecty('/api/recipes');
});

// Start Controllers 
const recipesController = require('./controllers/recipesController');
const usersController = require('./controllers/usersController');

// Directing Routes
app.use('/api/recipes', recipesController);
app.use('/api', usersController);

// End Controllers
app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
});
// Handling the errors
app.use(handleErrors);

// Start Server
app.listen(app.get('port'), () => {
    console.log(`🍀 Port: ${app.get('port')} 🌞`);
})

module.exports = app;