'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	.get('/historial/detalle-competencia/:id', (req, res , next) => {
		let competencia_id = req.params.id 
		req.getConnection((err , conexion) => {
			if (err != null){

			}
			let promesa = new Promise((resolve , reject) => {
				conexion.query(`SELECT com.nombre as 'nombreCompetencia' , DATE_FORMAT(com.fecha,'%d/%m/%Y') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' , cat.nombre as 'categoria' FROM competencia com LEFT JOIN categoria cat ON com.id_categoria=cat.id where com.id = ?` , competencia_id, (err , rows) =>{
					err != null ? reject(err) : resolve(rows)
				})
			})
			promesa
				.then((dataCompetencia) => {
					return new Promise((resolve , reject) => {
						conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) as 'competidor', com_at.numero_atleta as 'numero' , SEC_TO_TIME(com_at.tiempo) as 'tiempo' FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id WHERE com_at.id_competencia=${competencia_id} ORDER BY tiempo ASC`, (err , rows) =>{
							err != null ? reject(err) : resolve({dataCompetencia : dataCompetencia , dataCompetidores : rows})
						})
					})
				})
				.then((data) => {
					res.render('historial/detalle-competencia', data)
				})
				.catch((err) =>{
					console.log(err.message)
				})
		})
	})

module.exports = router