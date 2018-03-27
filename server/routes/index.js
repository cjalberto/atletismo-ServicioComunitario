'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()


router
	.use(conexion)
	.get('/', (req, res , next) => {
		res.render('index')
	})

	.get('/carreras', (req, res , next) => {
		res.render('carreras');
	})
	.get('/carreras/crear', (req, res , next) => {
				//consulta todos los competidores
		let promesa = new Promise((resolve, reject) => {
			req.getConnection((err , conexion) => {
				if (err != null){
					reject(new Error('no se pudo conectar a la base de datos'))
				}
				conexion.query('SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM  atleta at LEFT JOIN club cl ON at.id_club=cl.id' , (err , rows) =>{
					err != null ? reject(new Error('no se pudo leer la base de datos')) : resolve(rows)
				})
			})
		})
		promesa
			.then((rows) => {
				return new Promise((resolve , reject) => {
					req.getConnection((err , conexion) => {
						if (err != null){
							reject(new Error('no se pudo conectar a la base de datos'))
						}
						conexion.query('SELECT * FROM  categoria' , (err , rows2) =>{
							console.log('consulta 2 hecha')
							err != null ? reject(new Error('no se pudo leer la base de datos')) : resolve(rows , rows2)
						})
					})	
				})
			})
			.then((atletas , categorias) =>{
				res.render('carreras/crear', atletas , categorias)
			})
			.catch((err) => {
				console.log(err.message)
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
	.get('/competidor/agregar', (req, res , next) => {
		res.render('/competidor/agregar')
	})
	.get('/competidor/modificar', (req, res , next) => {
		res.render('/competidor/modificar')
	})
	.get('/competidor/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM  atleta' , (err , rows) =>{
				let listCompetidores = rows
				console.log(listCompetidores)
				res.render('/competidor/listar')
			})
		})
	})
	.post('/agregar/competidor' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let competidor = {
				primer_nombre : req.body.primer_nombre,
				segundo_nombre : req.body.segundo_nombre,
				primer_apellido : req.body.primer_apellido,
				segundo_apellido : req.body.segundo_apellido,
				cedula : req.body.cedula,
				fecha_nacimiento : req.body.fecha_nacimiento,
				id_club : req.body.id_club,
				id_categoria : req.body.id_categoria
			}
			conexion.query('INSERT INTO atleta SET ?' , competidor, (err , rows) =>{
				return (err) ? res.redirect('/competidor/crear') : res.redirect('/competidor/listar')
			})
		})
	})
	.get('/eliminar/competidor/:competidor_id', (req, res , next) => {
		let competidor_id = req.params.competidor_id
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM atleta where id = ?' , competidor_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('/competidor/listar')
				}
			})
		})
	})


	///crud de categorias
	.get('/categoria/agregar', (req, res , next) => {
		res.render('categoria/agregar')
	})
	.get('/categoria/modificar', (req, res , next) => {
		res.render('categoria/modificar')
	})
	.get('/categoria/listar', (req, res , next) => {
		//consulta todas las categorias
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM  categoria' , (err , rows) =>{
				let listCategorias = rows
				console.log(listCategorias)
				res.render('categoria/listar')
			})
		})
	})
	.post('/agregar/categoria' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let categoria = {
				nombre : req.body.nombre,
				descripcion : req.body.descripcion
			}
			conexion.query('INSERT INTO categoria SET ?' , categoria, (err , rows) =>{
				return (err) ? res.redirect('categoria/crear') : res.redirect('categoria/listar')
			})
		})
	})
	.get('/eliminar/categoria/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		console.log(categoria_id)
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM categoria where id = ?' , categoria_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('categoria/listar')
				}
			})
		})
	})


	///crud de club
	.get('/club/agregar', (req, res , next) => {
		res.render('/club/agregar')
	})
	.get('/club/modificar', (req, res , next) => {
		///modificar de la base de datos
		res.render('/club/modificar')
	})
	.get('/club/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM  club' , (err , rows) =>{
				let listClubes = rows
				console.log(listClubes)
				res.render('/club/listar')
			})
		})
	})
	.post('/agregar/club' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let club = {
				nombre : req.body.nombre,
				descripcion : req.body.descripcion
			}
			conexion.query('INSERT INTO club SET ?' , club, (err , rows) =>{
				return (err) ? res.redirect('/club/crear') : res.redirect('/club/listar')
			})
		})
	})
	.get('/eliminar/club/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		console.log(club_id)
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM club where id = ?' , club_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('/club/listar')
				}
			})
		})
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
	.post('/agregar/competencia' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let competencia = {
				nombre : req.body.nombre,
				fecha : req.body.vecha,
				hora : req.body.hora,
				lugar : req.body.lugar,
				id_categoria : req.body.id_categoria
			}
			conexion.query('INSERT INTO competencia SET ?' , competencia, (err , rows) =>{
				return (err) ? res.redirect('/competencia/crear') : res.redirect('/competencia/listar')
			})
		})
	})
	.get('/eliminar/competencia/:competencia_id', (req, res , next) => {
		let competencia_id = req.params.competencia_id
		console.log(competencia_id)
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM competencia where id = ?' , competencia_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('/competencia/listar')
				}
			})
		})
	})
	

module.exports = router