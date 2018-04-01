'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)

	//CREAR//
	.get('/competencia/crear', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query('SELECT * FROM  categoria' , (err , categorias) =>{
					(err) ?  res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/crear-1',{categorias: categorias})
				})
			}		
		})
	})
	.post('/competencia/crear' , (req, res , next) => {
		let categoria_id = req.body.categoria.split('-')[0],
			sexo = req.body.categoria.split('-')[1],
			cat_nombre = req.body.categoria.split('-')[2]
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}else{
				if(sexo == 'Mixto'){
					if(cat_nombre == 'libre'){
						conexion.query(`SELECT at.*, cl.nombre club_nombre , CONCAT(ca.nombre , '-' , ca.sexo) as 'categoria' FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria ca ON ca.id=at.id_categoria ` , (err , atletas) =>{
							(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body, datosCatNombre: cat_nombre})
						})
					}
					else{
						conexion.query(`SELECT at.* , cl.nombre club_nombre , CONCAT(ca.nombre , '-' , ca.sexo) as 'categoria' FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria ca ON ca.id=at.id_categoria WHERE ca.nombre=${cat_nombre} ` , (err , atletas) =>{
							(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body, datosCatNombre: cat_nombre})
						})
					}
				}else{
					if(cat_nombre == 'libre'){
						conexion.query(`SELECT at.* , cl.nombre club_nombre , CONCAT(ca.nombre , '-' , ca.sexo) as 'categoria' FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria ca ON ca.id=at.id_categoria WHERE at.sexo=${sexo} ` , (err , atletas) =>{
							(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body, datosCatNombre: cat_nombre})
						})
					}
					else{
						conexion.query(`SELECT at.*, cl.nombre club_nombre , CONCAT(ca.nombre , '-' , ca.sexo) as 'categoria' FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id where at.id_categoria = ?` , categoria_id , (err , atletas) =>{
							(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body, datosCatNombre: cat_nombre})
						})
					}
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
                            (err) ? res.render('error', {mensaje : 'Error al eliminar registro de la base de datos' , code : 404}) :  res.redirect('/competencia/listar')
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
				conexion.query(`SELECT com.nombre as 'nombre' , com.id as 'id' , DATE_FORMAT(com.fecha,'%Y-%m-%d') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' , cat.nombre as 'categoria' , cat.id as 'id_categoria'  , cat.sexo as 'sexo' FROM competencia com LEFT JOIN categoria cat ON com.id_categoria=cat.id WHERE com.id = ?`, competencia_id, (err, rows) => {
                if (err){
                	res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
                }
                if (rows.length <= 0) {
                    res.redirect('/competencia/listar')
                } else {

	                if (rows[0].id_categoria == '1') {
	                    conexion.query('SELECT at.id, at.cedula, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre, cat.nombre categoria_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria cat ON at.id_categoria=cat.id', (err, atletas) => {
							conexion.query('SELECT * FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, compe_atleta) => {
	                    		if (err){
	                    			res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
	                    		}
	                    		else{
	                    			res.render('competencia/modificar', {
                                    	datosCompe: rows,
                                    	datosAtletas: atletas,
                                    	datosCompeAtleta: compe_atleta
                                	})
	                    		}
	                    	})
						})
	                } else {
	                    conexion.query('SELECT at.id, at.cedula, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre, cat.nombre categoria_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria cat ON at.id_categoria=cat.id where at.id_categoria = ?', rows[0].id_categoria, (err, atletas) => {
							conexion.query('SELECT * FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, compe_atleta) => {
		                    	if (err){
	                    			res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
	                    		}else{
	                    			res.render('competencia/modificar', {
                                    	datosCompe: rows,
                                    	datosAtletas: atletas,
                                    	datosCompeAtleta: compe_atleta
                                	})
	                    		}
	                    	})
	                    })
	                }
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
            	conexion.query('SELECT * FROM competencia WHERE finalizado = 0', (err, rows) => {
                	(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/iniciar', { datosCompetencia: rows })
            	})
	        }
        })
    })

module.exports = router