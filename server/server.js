var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var envVars = require('../env.json');

// Initialize express
var app = express();

// make connection to mongoose database
var url = envVars.mlab_url;
mongoose.connect(`${url}`).then(
  () => { console.log('mongoose connected!')},
  err => { console.log('mongoose connection error!', err) }
);

// use middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true})); // in case we need this later (from Shortly-Angular sprint)
app.use(morgan('dev'));

// server static files in public
app.use(express.static(path.join(__dirname, '../public')));

var port = process.env.PORT || envVars.PORT || 8222;

app.listen(port, function() {
  console.log(`\n\nlistening on port: ${port}`);
});

// Hook up routes
require('./routes.js')(app, express);
