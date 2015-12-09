//Base setup  *************************************************

//Call the packages:
var express = require('express'),			//calls express
	app = express(),						//define our app using express
	bodyParser = require('body-parser'),	//get body-parser
	morgan = require('morgan'),				//used to see requests
	mongoose = require('mongoose'),			//works with our DB
	port = process.env.PORT || 8080,		//sets our app's port
	user = require('./app/models/user');	//pulls in user.js

//connect to DB
var localDb = 'mongodb://localhost:27017/crm',
	remoteDb = '';
mongoose.connect(localDb);

//App config:
//Use body parser to grab infor' from POST req'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//conf' our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

//log all req' to the console
app.use(morgan('dev'));

//Routes for our API ********************************************

//basic route(home page)
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

//get an instance of the express router
var apiRouter = express.Router();

//middleware to use for all requests
apiRouter.use(function(req, res, next) {
	//do logging
	console.log('Somebody just came to our app!');
	//this is where to authenticate users
	next(); //make sure we go to the next routes and don't stop here
});

//test route making sure everything works
//accessed at Get http://localhost:8080/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'Hooray! Welcome to our api' });
});

//we can have more routes for our api here

//Register our routes:
//all our routes will be prefixed with /api
app.use('/api', apiRouter);

//Start the server*************************************************
app.listen(port);
console.log('Magic happens on port ' + port);