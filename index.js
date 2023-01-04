// Instantiate Express
const express = require('express');
// Instantiate Cors
const cors = require('cors');
// Instantiate app
const app = express();

// json server
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db/seed.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;	

// Request Loggers and Custom Errors
const request_logger = require('./middleware/request_logger');
const { handleErrors } = require('./middleware/custom_errors');

app.set('port', process.env.PORT || 3000);

// Middleware
server.use(middlewares);
server.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(request_logger);

// Routes

// Redirect
app.get('/', function (req, res) {
	res.redirect('/api/recipes');
});

// Start Controllers
const recipesController = require('./controllers/recipesController');
const usersController = require('./controllers/usersController');
const { json } = require('body-parser');

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
});

server.listen(port);

module.exports = app;
