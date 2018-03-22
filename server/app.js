'use strict'

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	routes = require('./routes/index'),
	port = 8080,
	conexion = require('./conexion.js')



app.listen(port, () => {
	console.log('app started')
})

app
	.set('view engine' , 'ejs')
	.set('port' , port)

	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended : false}))
	.use(express.static('public'))
	.use('/carreras',express.static('public'))
	.use(routes)
	.use(conexion)

module.exports = app