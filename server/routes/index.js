'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	//INDEX
	.get('/', (req, res , next) => {
		res.render('index')
	})
	//COMPETENCIA
	.get('/competencia', (req, res , next) => {
		res.render('competencia');
	})
	//GESTIONAR
	.get('/gestionar', (req, res , next) => {
		res.render('gestionar');
	})
	//HISTORIAL
	.get('/historial', (req, res , next) => {
		res.render('historial');
	})

module.exports = router