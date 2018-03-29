'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	.get('/historial/detalle-competencia/:id', (req, res , next) => {
		let competencia_id = req.params.id 
		req.getConnection((err , conexion) => {
			if (err){
				reject(new Error('Error al conectarse a la base de datos'))
			}
			let promesa = new Promise((resolve , reject) => {
				conexion.query(`SELECT com.nombre as 'nombreCompetencia' , DATE_FORMAT(com.fecha,'%d/%m/%Y') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' , cat.nombre as 'categoria'  , cat.sexo as 'sexo' FROM competencia com LEFT JOIN categoria cat ON com.id_categoria=cat.id where com.id = ?` , competencia_id, (err , rows) =>{
					(err) ? reject(new Error('Error al consultar la base de datos')) : resolve(rows[0])
				})
			})
			promesa
				.then((dataCompetencia) => {
					return new Promise((resolve , reject) => {
						conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) as 'competidor', com_at.numero_atleta as 'numero' , SEC_TO_TIME(com_at.tiempo) as 'tiempo' FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id WHERE com_at.id_competencia=${competencia_id}  ORDER BY tiempo ASC`, (err , rows) =>{
							(err) ? reject(new Error('Error al consultar la base de datos')) : resolve({dataCompetencia : dataCompetencia , dataCompetidores : rows})
						})
					})
				})
				.then((data) => {
					res.render('historial/detalle-competencia', data)
				})
				.catch((err) =>{
					res.render('error', {mensaje : err.message , code : 404})
				})
		})
	})
	.post('/historial/filtrar-carrera', (req, res , next) => {
		let text = req.body.text
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query(`SELECT competencia.id , competencia.nombre as 'nombre' , competencia.fecha , competencia.hora , competencia.lugar , categoria.nombre as 'categoria' , categoria.sexo as 'sexo' FROM competencia LEFT JOIN categoria ON competencia.id_categoria=categoria.id WHERE finalizado = 1 AND competencia.nombre LIKE '%${text}%'` , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.render('historial', { Competencias: rows })
			})
		})
	})
	.post('/historial/filtrar-atletas', (req, res , next) => {
		let text = req.body.text
		let competencia_id = req.body.competencia_id
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			let promesa = new Promise((resolve , reject) => {
				conexion.query(`SELECT com.nombre as 'nombreCompetencia' , DATE_FORMAT(com.fecha,'%d/%m/%Y') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' , cat.nombre as 'categoria'  , cat.sexo as 'sexo' FROM competencia com LEFT JOIN categoria cat ON com.id_categoria=cat.id where com.id = ?` , competencia_id, (err , rows) =>{
					(err) ? reject(new Error('Error al consultar la base de datos')) : resolve(rows[0])
				})
			})
			promesa
				.then((dataCompetencia) => {
					return new Promise((resolve , reject) => {
						conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) as 'competidor', com_at.numero_atleta as 'numero' , SEC_TO_TIME(com_at.tiempo) as 'tiempo' FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id WHERE com_at.id_competencia=${competencia_id} AND (atl.primer_nombre LIKE '%${text}%' OR atl.primer_apellido LIKE '%${text}%' OR com_at.numero_atleta LIKE '%${text}%') ORDER BY tiempo ASC` , (err , rows) =>{
							(err) ? reject(new Error('Error al consultar la base de datos')) : resolve({dataCompetencia : dataCompetencia , dataCompetidores : rows})
						})
					})
				})
				.then((data) => {
					res.render('historial/detalle-competencia', data)
				})
				.catch((err) =>{
					res.render('error', {mensaje : err.message , code : 404})
				})
			/*conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) as 'competidor', com_at.numero_atleta as 'numero' , SEC_TO_TIME(com_at.tiempo) as 'tiempo' FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id WHERE com_at.id_competencia=${competencia_id} AND (atl.primer_nombre LIKE '%${text}%' OR atl.primer_apellido LIKE '%${text}%' OR com_at.numero_atleta LIKE '%${text}%') ORDER BY tiempo ASC` , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.render('historial/detalle-competencia', { Competencias: rows })
			})*/
		})
	})
module.exports = router