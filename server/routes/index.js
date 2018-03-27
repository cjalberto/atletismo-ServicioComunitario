'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router(),
	carrera = {
		
	}


router
	.use(conexion)


	.get('/', (req, res , next) => {
		res.render('index')
	})
	.get('/carreras', (req, res , next) => {
		res.render('carreras');
	})
	.get('/carreras/crear', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM  categoria' , (err , categorias) =>{
				if (err != null){
				
				}
				res.render('carreras/crear',categorias)
			})
		})
	})
	.get('/carreras/modificar', (req, res , next) => {
		res.render('carreras/modificar');
	})
	.get('/carreras/iniciar', (req, res , next) => {
		res.render('carreras/iniciar');
	})
	.post('/carreras/crear/primero' , (req, res , next) => {
		let categoria_id = req.body.categoria_id
		req.getConnection((err , conexion) => {
			if (err != null){
			}
			conexion.query('SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id where at.id_categoria = ?' , categoria_id , (err , atetas) =>{
				if (err != null){
				}
				res.render('carreras/crear',atetas)
			})
		})
	})
	.post('/carreras/crear/segundo' , (req, res , next) => {
		let categoria_id = req.body.categoria_id
		req.getConnection((err , conexion) => {
			if (err != null){
			}
			conexion.query('SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id where at.id_categoria = ?' , categoria_id , (err , atetas) =>{
				if (err != null){
				}
				res.render('carreras/crear',atetas)
			})
		})
	})


	.get('/competidores', (req, res , next) => {
		res.render('competidores');
	})
	.get('/historial', (req, res , next) => {
		res.render('historial');
	})


	///crud de atletas
	.get('/competidor/crear', (req, res , next) => {
		res.render('competidor/crear')
	})
	.get('/competidor/modificar', (req, res , next) => {
		res.render('competidor/modificar')
	})
	.get('/competidor/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM  atleta' , (err , rows) =>{
				let listCompetidores = rows
				res.render('competidor/listar')
			})
		})
	})
	.post('/crear/competidor' , (req, res , next) => {
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
				return (err) ? res.redirect('competidor/crear') : res.redirect('competidor/listar')
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
					res.redirect('competidor/listar')
				}
			})
		})
	})


	///crud de categorias
	.get('/categoria/crear', (req, res , next) => {
		res.render('categoria/crear')
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
	.post('/crear/categoria' , (req, res , next) => {
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
	.get('/club/crear', (req, res , next) => {
		res.render('club/crear')
	})
	.get('/club/modificar', (req, res , next) => {
		///modificar de la base de datos
		res.render('club/modificar')
	})
	.get('/club/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM  club' , (err , rows) =>{
				let listClubes = rows
				console.log(listClubes)
				res.render('club/listar')
			})
		})
	})
	.post('/crear/club' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let club = {
				nombre : req.body.nombre,
				descripcion : req.body.descripcion
			}
			conexion.query('INSERT INTO club SET ?' , club, (err , rows) =>{
				return (err) ? res.redirect('club/crear') : res.redirect('/club/listar')
			})
		})
	})
	.get('/eliminar/club/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM club where id = ?' , club_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('club/listar')
				}
			})
		})
	})
	

module.exports = router