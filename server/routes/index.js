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

	///crud de competencia
	.get('/competencia/agregar', (req, res , next) => {
		res.render('/competencia/agregar')
	})
	.get('/competencia/modificar', (req, res , next) => {
		res.render('competencia/modificar')
	})
	.get('/competencia/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM  competencia' , (err , rows) =>{
				let listCompetencias = rows
				console.log(listCompetencias)
				res.render('competencia/listar')
			})
		})
	})

module.exports = router