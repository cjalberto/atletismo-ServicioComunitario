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
				console.log(categorias)
				res.render('competencia/crear',{categorias: categorias, datosCompetidores: 'null'})
			})
		})
	})
	.get('/competencia/modificar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM competencia' , (err , rows) =>{
				console.log(rows)
				res.render('competencia/modificar', { datosCompetencia: rows })
			})
		})
	})
	.get('/competencia/modificar/(:id)', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM competencia WHERE id = ' + req.params.id, (err , rows) =>{
				console.log(rows)
				res.render('competencia/modificar', { datosCompetencia: rows })
			})
		})
	})
	.get('/competencia/iniciar', (req, res , next) => {
		res.render('competencia/iniciar');
	})
	.post('/competencia/crear/primero' , (req, res , next) => {
		console.log(req.body)
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
		let categoria_id = req.body.categoria_id
		req.getConnection((err , conexion) => {
			if (err != null){
			}
			conexion.query('SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id where at.id_categoria = ?' , categoria_id , (err , atetas) =>{
				if (err != null){
				}
				res.render('competencia/crear',atetas)
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