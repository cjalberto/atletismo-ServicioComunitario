//main.js
var express = require('express');
var app = express();
var port = 8080;

// File into Public
app.use(express.static('public'));

// start the server
app.listen(port, function() {
	console.log('app started');
});
// view engime
app.set('view engine', 'ejs');

// route our app
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/home', function(req, res){
	res.render('index');
});

app.get('/about', function(req, res){
	res.render('about');
});