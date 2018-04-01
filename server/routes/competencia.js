'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)

	//CREAR//
	.get('/competencia/crear', (req, res , next) => {
		res.render('competencia/crear-1')
	})
	.post('/competencia/crear' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query(`SELECT at.*, cl.nombre club_nombre , TIMESTAMPDIFF(YEAR,at.fecha_nacimiento,CURDATE()) edad , IFNULL((SELECT categoria.nombre FROM categoria WHERE (edad BETWEEN categoria.edad_min AND categoria.edad_max) AND categoria.sexo=at.sexo) , 'sin categoria') categoria FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id` , (err , atletas) =>{
				(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body})
			})
		})
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
					finalizado : 0
				}
				conexion.query('INSERT INTO competencia SET ?' , competencia, (err , rows) =>{				
					if (err){
						res.render('error', {mensaje : 'Error al guardar la data en la base de datos' , code : 404})
					}else{
						var i, count = 0
						for(i=0; i<req.body.id_atleta.length;i++){
							let competencia_atleta = {
								id_atleta : req.body.id_atleta[i],
								id_competencia : rows.insertId,
							}
							conexion.query('INSERT INTO competencia_atleta SET ?' , competencia_atleta, (err , rows) =>{				
								if (err){
									res.render('error', {mensaje : 'Error al guardar la data en la base de datos' , code : 404})
								}else{
									count = count + 1;
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

    //LISTAR//
    .get('/competencia/listar', (req, res, next) => {
        req.getConnection((err, conexion) => {
            if (err != null) {
            	res.render('error', {mensaje : 'Error al conextarse a la base de datos' , code : 404})
            }else{
	            conexion.query(`SELECT com.nombre as 'nombre' , com.id as 'id' , DATE_FORMAT(com.fecha,'%d/%m/%Y') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' , cat.nombre as 'categoria'  , cat.sexo as 'sexo' FROM competencia com LEFT JOIN categoria cat ON com.id_categoria=cat.id WHERE finalizado=0`, (err, rows) => {
	                (err) ? res.render('error', {error: err, mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/listar', { datosCompetencia: rows })
	            })          	
            }
        })
    })

    //DELETE//
    .post('/competencia/eliminar/:competencia_id', (req, res, next) => {
        let competencia_id = req.params.competencia_id
        req.getConnection((err, conexion) => {
        	if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
            conexion.query('DELETE FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, rows) => {
                if (err) {} else {
                    conexion.query('DELETE FROM competencia WHERE id = ?', competencia_id, (err, rows) => {
                            (err) ? res.render('error', {mensaje : 'Error al eliminar registro de la base de datos' , code : 404}) :  res.redirect('back')
                    })
                }
            })
        })
    })
    //EDIT//
    .get('/competencia/modificar/:competencia_id', (req, res, next) => {
        let competencia_id = req.params.competencia_id
        req.getConnection((err, conexion) => {
        	if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT com.nombre as 'nombre' , com.id as 'id' , DATE_FORMAT(com.fecha,'%Y-%m-%d') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' , cat.nombre as 'categoria' , cat.id as 'id_categoria'  , cat.sexo as 'sexo' FROM competencia com LEFT JOIN categoria cat ON com.id_categoria=cat.id WHERE com.id = ?`, competencia_id , (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							resolve(rows[0])
						}
					})
				})
				promesa
					.then((competencia) => {
						return new Promise((resolve , reject) => {
							conexion.query(`SELECT at.*, cl.nombre club_nombre , ca.nombre as 'categoria' FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria ca ON ca.id=at.id_categoria ` , (err , atletas) =>{
								(err) ? reject({err : new Error('Error al consultar la base de datos') , flag : false}) : resolve({dataCompetencia : competencia , dataAtletas : atletas})
							})
						})
					})
					.then((data) => {
						conexion.query(`SELECT * FROM competencia_atleta WHERE id_competencia = ?`, competencia_id, (err, compe_atleta) =>{
							(err) ? reject({err : new Error('Error al consultar la base de datos') , flag : false}) : resolve({datosCompe : data.dataCompetencia , datosAtletas : data.dataAtletas , datosCompeAtleta : compe_atleta})
						})
					})
					.then((data) => {
						res.render('competencia/modificar', data)
					})
					.catch((err) =>{
						if (err.flag){
							res.status(404)
							res.send({mensaje : err.err.message , code : 404})
						}
						else{
							res.render('error', {mensaje : err.err.message , code : 404})
						}
					})
			}
        })
    })
    .post('/competencia/modificar/regresar', (req, res, next) => {
        res.redirect('../listar')
    })
    .post('/competencia/modificar/:competencia_id', (req, res, next) => {
    	let competencia_id = req.params.competencia_id
        let competencia = {
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            hora: req.body.hora,
            lugar: req.body.lugar,
            finalizado: 0,
            id_categoria: req.body.id_categoria
        }
        req.getConnection((err, conexion) => {
        	if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
            conexion.query('UPDATE competencia SET ? WHERE id = ' + competencia_id, competencia, (err, result) =>{                 
				conexion.query('SELECT * FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, compe_atleta) =>{ 
					if (err){
	        	        res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
	        	    }         
	        	    else{
	        	    	var i,j,count=0
				
						for(i=0;i<req.body.id_atleta.length;i++){
							for(j=0;j<compe_atleta.length;j++){
								if(req.body.id_atleta[i]==compe_atleta[j].id_atleta){
									console.log("atleta nuevo "+ req.body.id_atleta[i]+" ya existe en DB "+compe_atleta[j].id_atleta)
									j=compe_atleta.length-1
								}else{
									count = j + 1
								if(count==compe_atleta.length){
										let competencia_atleta = {
	                                	id_atleta: req.body.id_atleta[i],
	                                		id_competencia: competencia_id
	                            		}
	                        			conexion.query('INSERT INTO competencia_atleta SET ?', competencia_atleta, (err, rows) => {
	                          				console.log("nuevo competidor "+competencia_atleta.id_atleta)
	                          			})
									}
								}
							}		
						}

						for(i=0;i<compe_atleta.length;i++){
							for(j=0;j<req.body.id_atleta.length;j++){
								if(compe_atleta[i].id_atleta==req.body.id_atleta[j]){
								console.log("atleta de la DB "+ compe_atleta[i].id_atleta+" ya es atleta nuevo "+req.body.id_atleta[j])
									j=req.body.id_atleta.length-1
								}else{
									count = j + 1
									if(count=req.body.id_atleta.length){
										console.log("eliminado competidor "+compe_atleta[i].id_atleta+ " de competencia "+competencia_id)
	                        			conexion.query('DELETE FROM competencia_atleta WHERE id_atleta = '+compe_atleta[i].id_atleta+' AND id_competencia = '+competencia_id, (err, rows) => {
	                          		
	                          			})
									}
								}			
							}
						}
	            	}       	
				})
			})
        })
		
		res.redirect('../listar')
    })

    //INICIAR//
    .get('/competencia/iniciar', (req, res, next) => {
        req.getConnection((err, conexion) => {
        	if (err){
	            res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
	        }
	        else{
            	conexion.query(`SELECT competencia.nombre , DATE_FORMAT(competencia.fecha,'%d/%m/%Y') fecha , TIME(competencia.hora) hora , competencia.lugar FROM competencia WHERE finalizado = 0`, (err, rows) => {
                	(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/iniciar', { datosCompetencia: rows })
            	})
	        }
        })
    })

module.exports = router