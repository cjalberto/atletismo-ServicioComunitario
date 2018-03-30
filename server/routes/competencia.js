'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	.get('/competencia/crear', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){
				
			}
			conexion.query('SELECT * FROM  categoria' , (err , categorias) =>{
				if (err){
				
				}
				res.render('competencia/crear-1',{categorias: categorias})
			})
		})
	})
	.post('/competencia/crear' , (req, res , next) => {
		let categoria_id = req.body.categoria,
			sexo = req.body.sexo
		req.getConnection((err , conexion) => {
			if (err){

			}else{
				if(sexo == 'Mixto'){
					conexion.query('SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id' , (err , atletas) =>{
					if (err){

					}else{
						res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body})
					}
				})
				}else{
					conexion.query(`SELECT at.id, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id where at.id_categoria = ?` , categoria_id , (err , atletas) =>{
						if (err){

						}else{
							res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body})
						}
					})
				}
			}
		})
	})
	.post('/competencia/crear/regresar' , (req, res , next) => {
		res.redirect('../crear')
	})
	.post('/competencia/crear/finalizar' , (req, res , next) => {
		
		req.getConnection((err , conexion) => {
			if (err){

			}else{
			let competencia = {
				nombre : req.body.nombre,
				fecha : req.body.fecha,
				hora : req.body.hora,
				lugar : req.body.lugar,
				finalizado : 0,
				id_categoria : req.body.id_categoria
			}
					conexion.query('INSERT INTO competencia SET ?' , competencia, (err , rows) =>{				
				if (err){
					console.log("error guardando competencia")
				}else{
					var count=0;
					var i=0;

					for(i=0; i<req.body.id_atleta.length;i++){

					let competencia_atleta = {
						id_atleta : req.body.id_atleta[i],
						id_competencia : rows.insertId,
					}
						conexion.query('INSERT INTO competencia_atleta SET ?' , competencia_atleta, (err , rows) =>{				
						if (err){
							console.log("error guardando competencia_atleta")
						}else{
							count=count+1;
							if(count==req.body.id_atleta.length){
								res.redirect('../')
							}
						}
					})
					}
				}
			})
			}
		})
	})







	.get('/competencia/modificar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){

			}
			conexion.query('SELECT * FROM competencia where finalizado=0' , (err , rows) =>{
				if (err){

				}
				res.render('competencia/modificar', { datosCompetencia: rows })
			})
		})
	})
	.get('/competencia/modificar/:id', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){

			}
			conexion.query('SELECT * FROM competencia WHERE id = ' + req.params.id, (err , rows) =>{
				if (err){

				}
				res.render('competencia/modificar', { datosCompetencia: rows })
			})
		})
	})
	.get('/competencia/iniciar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){

			}
			conexion.query(`SELECT competencia.id , competencia.nombre as 'nombre' , competencia.fecha , competencia.hora , competencia.lugar , categoria.nombre as 'categoria' , categoria.sexo as 'sexo' FROM competencia LEFT JOIN categoria ON competencia.id_categoria=categoria.id WHERE finalizado = 0`, (err , rows) =>{
				if (err){

				}
				res.render('competencia/iniciar', { datosCompetencia: rows })
			})
		})
	})
	.post('/competencia/competencia-atleta' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){

			}
			let data = {
				atleta_id : req.body.atleta_id,
				competencia_id : req.body.competencia_id,
				tiempo : req.body.tiempo
			}
			conexion.query('INSERT INTO competencia_atleta SET ?' , data, (err , rows) =>{
				if (err){
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