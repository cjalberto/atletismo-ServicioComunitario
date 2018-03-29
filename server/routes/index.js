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
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query(`SELECT competencia.id , competencia.nombre as 'nombre' , competencia.fecha , competencia.hora , competencia.lugar , categoria.nombre as 'categoria' , categoria.sexo as 'sexo' FROM competencia LEFT JOIN categoria ON competencia.id_categoria=categoria.id WHERE finalizado = 1`, (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.render('historial', { Competencias: rows })
			})
		})
	})

module.exports = router