'use strict'

var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	routes = require('./routes/index'),
	port = 8080


app
	.set('view engine' , 'ejs')
	.set('port' , port)
	.set('views' , path.join(__dirname , '../views'))

	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended : false}))
	.use(express.static(path.join(__dirname , '../public')))
	.use(routes)

module.exports = app

/*
	.use(express.static('public'))
	.use('/carreras',express.static('public'))
	.use('/carreras/modificar',express.static('public'))
*/