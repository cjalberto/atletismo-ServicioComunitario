'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)


	.get('/', (req, res , next) => {
		res.render('index')
	})

	//crud de carreras
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
	.get('/carreras/modificar/:carrera_id', (req, res , next) => {
		let carrera_id = req.params.carrera_id
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM competencia where competencia.id = ?' , carrera_id , (err , carrera) =>{
				if (err != null){
				
				}
				res.render('carreras/modificar',carrera)
			})
		})
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
				res.redirect('carreras/crear',atetas)
			})
		})
	})
	.post('/carreras/crear/segundo' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let carrera = {
				nombre : req.body.nombre,
				fecha : req.body.fecha,
				hora : req.body.hora,
				lugar : req.body.lugar,
				finalizado : 0,
				id_categoria : req.body.id_categoria
			}
			conexion.query('INSERT INTO competencia SET ?' , carrera, (err , rows) =>{
				if (err != null){

				}
				res.redirect('carreras/iniciar')
			})
		})
	})
	.post('/carreras/competencia-atleta' , (req, res , next) => {
		let data = {
			atleta_id : req.body.atleta_id,
			competencia_id : req.body.competencia_id,
			tiempo : req.body.tiempo
		}
		conexion.query('INSERT INTO competencia_atleta SET ?' , data, (err , rows) =>{
			if (err != null){
			}
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
	.get('/competidor/modificar/:competidor_id', (req, res , next) => {
		let competidor_id = req.params.competidor_id
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM atleta where atleta.id = ?' , competidor_id , (err , carrera) =>{
				if (err != null){
				
				}
				res.render('competidor/modificar' , competidor)
			})
		})
	})
	.get('/competidor/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM  atleta' , (err , rows) =>{
				if (err != null){
				
				}
				res.render('competidor/listar' , rows)
			})
		})
	})
	.post('/crear/competidor' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
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
			if (err != null){
				
			}
			conexion.query('DELETE FROM atleta where atleta.id = ?' , competidor_id , (err , rows) =>{
				if (err != null){
				
				}
				res.redirect('competidor/listar')
			})
		})
	})


	///crud de categorias
	.get('/categoria/crear', (req, res , next) => {
		res.render('categoria/crear')
	})
	.get('/categoria/modificar/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM categoria where categoria.id = ?' , categoria_id , (err , categoria) =>{
				if (err != null){
				
				}
				res.render('categoria/modificar' , categoria)
			})
		})
	})
	.get('/categoria/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
				
				}
			conexion.query('SELECT * FROM  categoria' , (err , rows) =>{
				if (err != null){
				
				}
				res.render('categoria/listar' , rows)
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
	.get('/club/modificar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM club where club.id = ?' , club_id , (err , club) =>{
				if (err != null){
				
				}
				res.render('club/modificar' , club)
			})
		})
	})
	.get('/club/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM  club' , (err , rows) =>{
				if (err != null){
				
				}
				res.render('club/listar' , rows)
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