//main.js
var express = require('express');
var app = express();
var port = 8080;

// File into Public
app.use(express.static('public'));
app.use('/carreras',express.static('public'));

// start the server
app.listen(port, function() {
	console.log('app started');
});
// view engine
app.set('view engine', 'ejs');

// route our app
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/carreras', function(req, res){
	res.render('carreras');
});

app.get('/carreras/crear', function(req, res){
	res.render('carreras/crear');
});

app.get('/carreras/modificar', function(req, res){
	res.render('carreras/modificar');
});

app.get('/carreras/iniciar', function(req, res){
	res.render('carreras/iniciar');
});

app.get('/competidores', function(req, res){
	res.render('competidores');
});

app.get('/historial', function(req, res){
	res.render('historial');
});