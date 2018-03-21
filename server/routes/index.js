'use strict'

var express = require('express'),
	router = express.Router()


function error404(req , res , next){
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}
	error.status = 404
	///mrenderizar la pagina de error
	next()
}

router
	.get('/', (req, res) => {
		res.render('index');
	})
	.get('/carreras', (req, res) => {
		res.render('carreras');
	})
	.get('/carreras/crear', (req, res) => {
		res.render('carreras/crear');
	})
	.get('/carreras/modificar', (req, res) => {
		res.render('carreras/modificar');
	})
	.get('/carreras/iniciar', (req, res) => {
		res.render('carreras/iniciar');
	})
	.get('/competidores', (req, res) => {
		res.render('competidores');
	})
	.get('/historial', (req, res) => {
		res.render('historial');
	})

	///crud de atletas
	.get('/atleta/crear', (req, res) => {
		res.end('<h1>crud crear atleta</h1>')
	})
	.get('/atleta/eliminar', (req, res) => {
		///eliminar de la base de datos
		res.render('atletas')
	})
	.get('/atleta/modificar', (req, res) => {
		///modificar de la base de datos
		res.render('atletas')
	})

	///crud de categorias
	.get('/categoria/crear', (req, res) => {
		res.end('<h1>crud crear categoria</h1>')
	})
	.get('/categoria/eliminar', (req, res) => {
		///eliminar de la base de datos
		res.render('categoria')
	})
	.get('/categoria/modificar', (req, res) => {
		///modificar de la base de datos
		res.render('categoria')
	})

	///crud de club
	.get('/club/crear', (req, res) => {
		res.end('<h1>crud crear club</h1>')
	})
	.get('/club/eliminar', (req, res) => {
		///eliminar de la base de datos
		res.render('club')
	})
	.get('/club/modificar', (req, res) => {
		///modificar de la base de datos
		res.render('club')
	})


	///crud de competencia
	.get('/competencia/crear', (req, res) => {
		res.end('<h1>crud crear competencia</h1>')
	})
	.get('/competencia/eliminar', (req, res) => {
		///eliminar de la base de datos
		res.render('competencia')
	})
	.get('/competencia/modificar', (req, res) => {
		///modificar de la base de datos
		res.render('competencia')
	})

	.use(error404)

module.exports = router