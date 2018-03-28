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
		req.getConnection((err , conexion) => {
			if (err != null){

			}
			conexion.query('SELECT * FROM competencia WHERE finalizado = 0', (err , rows) =>{
				if (err != null){

				}
				res.render('historial', { Competencias: rows })
			})
		})
	})

module.exports = router