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
						conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) as 'competidor', com_at.numero_atleta as 'numero' , SEC_TO_TIME(com_at.tiempo) as 'tiempo' FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id WHERE com_at.id_competencia=${competencia_id} AND atl.sexo='${dataCompetencia.sexo}' ORDER BY tiempo ASC`, (err , rows) =>{
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
	.get('/historial/historial1', (req, res , next) => {
		console.log('entro')
		res.render('historial/historial1')
	})

module.exports = router