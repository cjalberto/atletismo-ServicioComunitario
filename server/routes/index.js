'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()


function error404(req , res , next){
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}
	error.status = 404
	///renderizar la pagina de error
	next()
}

router
	.use(conexion)
	.get('/', (req, res , next) => {
		res.render('index');		
	})

	.get('/carreras', (req, res , next) => {
		res.render('carreras');
	})
	.get('/carreras/crear', (req, res , next) => {
				//consulta todos los competidores
		req.getConnection((err , conexion) => {
			conexion.query('SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM  atleta at LEFT JOIN club cl ON at.id_club=cl.id' , (err , rows) =>{
				console.log(rows)
				res.render('carreras/crear', { datosCompetidores: rows })
			})
		})
	})
	.get('/carreras/modificar', (req, res , next) => {
		res.render('carreras/modificar');
	})
	.get('/carreras/iniciar', (req, res , next) => {
		res.render('carreras/iniciar');
	})
	.get('/competidores', (req, res , next) => {
		res.render('competidores');
	})
	.get('/historial', (req, res , next) => {
		res.render('historial');
	})

	///crud de atletas
	.get('/competidores/crear', (req, res , next) => {
		res.end('<h1>crud crear atleta</h1>')
	})
	.get('/competidores/eliminar', (req, res , next) => {
		///eliminar de la base de datos
		res.render('atletas')
	})
	.get('/competidores/modificar', (req, res , next) => {
		///modificar de la base de datos
		res.render('atletas')
	})
	.get('/competidores/listar', (req, res , next) => {
		res.render('competidores')
	})

	///crud de categorias
	.get('/categoria/crear', (req, res , next) => {
		res.end('<h1>crud crear categoria</h1>')
	})
	.get('/categoria/eliminar', (req, res , next) => {
		///eliminar de la base de datos
		res.render('categoria')
	})
	.get('/categoria/modificar', (req, res , next) => {
		///modificar de la base de datos
		res.render('categoria')
	})
	.get('/categoria/listar', (req, res , next) => {
		///modificar de la base de datos
		res.render('categoria')
	})

	///crud de club
	.get('/club/crear', (req, res , next) => {
		res.end('<h1>crud crear club</h1>')
	})
	.get('/club/eliminar', (req, res , next) => {
		///eliminar de la base de datos
		res.render('club')
	})
	.get('/club/modificar', (req, res , next) => {
		///modificar de la base de datos
		res.render('club')
	})
	.get('/club/listar', (req, res , next) => {
		///modificar de la base de datos
		res.render('club')
	})


	///crud de competencia
	.get('/competencia/crear', (req, res , next) => {
		res.end('<h1>crud crear competencia</h1>')
	})
	.get('/competencia/eliminar', (req, res , next) => {
		///eliminar de la base de datos
		res.render('competencia')
	})
	.get('/competencia/modificar', (req, res , next) => {
		///modificar de la base de datos
		res.render('competencia')
	})
	.get('/competencia/listar', (req, res , next) => {
		///modificar de la base de datos
		res.render('competencia')
	})

	.post('crear/competidor' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let competidor = {
				primer_nombre : req.body.primer_nombre,
				segundo_nombre : req.body.segundo_nombre,
				primer_apellido : req.body.primer_apellido,
				segundo_apellido : req.body.segundo_apellido,
				cedula : req.body.cedula,
				fecha_nacimiento : req.body.fecha_nacimiento,
				id_club : req.body.id_club
			}
			conexion.query('INSERT INTO atleta SET ?' , competidor, (err , rows) =>{
				return (err) ? res.redirect('/competidores/crear') : res.redirect('/competidores/listar')
			})
		})
	})

	.use(error404)

module.exports = router