'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	.get('/competencia/crear', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}
			conexion.query('SELECT * FROM  categoria' , (err , categorias) =>{
				if (err != null){
				
				}
				res.render('competencia/crear',{categorias: categorias, datosCompetidores: 'null'})
			})
		})
	})
	.get('/competencia/modificar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){

			}
			conexion.query('SELECT * FROM competencia' , (err , rows) =>{
				if (err != null){

				}
				res.render('competencia/modificar', { datosCompetencia: rows })
			})
		})
	})
	.get('/competencia/modificar/:id', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){

			}
			conexion.query('SELECT * FROM competencia WHERE id = ' + req.params.id, (err , rows) =>{
				if (err != null){

				}
				res.render('competencia/modificar', { datosCompetencia: rows })
			})
		})
	})
	.get('/competencia/iniciar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){

			}
			conexion.query('SELECT * FROM competencia WHERE finalizado = 0', (err , rows) =>{
				if (err != null){

				}
				res.render('competencia/iniciar', { datosCompetencia: rows })
			})
		})
	})
	.post('/competencia/crear/primero' , (req, res , next) => {
		let categoria_id = req.body.inputCategoria
		req.getConnection((err , conexion) => {
			if (err != null){

			}
			conexion.query('SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id where at.id_categoria = ?' , categoria_id , (err , atletas) =>{
				if (err != null){

				}
				res.render('competencia/crear',{datosCompetidores: atletas, categorias: 'null'})
			})
		})
	})
	.post('/competencia/crear/segundo' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){

			}
			let competencia = {
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
		req.getConnection((err , conexion) => {
			if (err != null){

			}
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
	})
	.post('/agregar/competencia' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){

			}
			let competencia = {
				nombre : req.body.nombre,
				fecha : req.body.vecha,
				hora : req.body.hora,
				lugar : req.body.lugar,
				id_categoria : req.body.id_categoria
			}
			conexion.query('INSERT INTO competencia SET ?' , competencia, (err , rows) =>{
				if (err){

				}
				return (err) ? res.redirect('/competencia/crear') : res.redirect('/competencia/listar')
			})
		})
	})
	.get('/eliminar/competencia/:competencia_id', (req, res , next) => {
		let competencia_id = req.params.competencia_id
		req.getConnection((err , conexion) => {
			if (err){

			}
			conexion.query('DELETE FROM competencia where id = ?' , competencia_id , (err , rows) =>{
				if (err){

				}
				res.redirect('/competencia/listar')
			})
		})
	})
	
module.exports = router