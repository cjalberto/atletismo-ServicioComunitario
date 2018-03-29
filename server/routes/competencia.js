'use strict'
var conexion = require('../conexion'),
    express = require('express'),
    router = express.Router()

router

	.use(conexion)
    //CREAR//
    .get('/competencia/crear', (req, res, next) => {
        req.getConnection((err, conexion) => {
            if (err != null) {}
            conexion.query('SELECT * FROM  categoria', (err, categorias) => {
                if (err != null) {}
                res.render('competencia/crear-1', {
                    categorias: categorias
                })
            })
        })
    })
    .post('/competencia/crear', (req, res, next) => {
        let split = req.body.categoria.split("|")
        let categoria_id = split[0]
        let categoria_nombre = split[1]
        req.getConnection((err, conexion) => {
            if (err != null) {} else {
                if (categoria_id == '1') {
                    conexion.query('SELECT at.id, at.cedula, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre, cat.nombre categoria_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria cat ON at.id_categoria=cat.id', (err, atletas) => {
                        if (err != null) {} else {
                            res.render('competencia/crear-2', {
                                datosCompetidores: atletas,
                                datosCompetencia: req.body,
                                datosCatId: categoria_id,
                                datosCatNombre: categoria_nombre
                            })
                        }
                    })
                } else {
                    conexion.query('SELECT at.id, at.cedula, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre, cat.nombre categoria_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria cat ON at.id_categoria=cat.id where at.id_categoria = ?', categoria_id, (err, atletas) => {
                        if (err != null) {} else {
                            res.render('competencia/crear-2', {
                                datosCompetidores: atletas,
                                datosCompetencia: req.body,
                                datosCatId: categoria_id,
                                datosCatNombre: categoria_nombre
                            })
                        }
                    })
                }
            }
        })
    })
    .post('/competencia/crear/regresar', (req, res, next) => {
        res.redirect('../crear')
    })
    .post('/competencia/crear/finalizar', (req, res, next) => {
        req.getConnection((err, conexion) => {
            if (err != null) {} else {
                let competencia = {
                    nombre: req.body.nombre,
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                    lugar: req.body.lugar,
                    finalizado: 0,
                    id_categoria: req.body.id_categoria
                }
                conexion.query('INSERT INTO competencia SET ?', competencia, (err, rows) => {
                    if (err != null) {
                        console.log("error guardando competencia")
                    } else {
                        var i, count = 0
                        for (i = 0; i < req.body.id_atleta.length; i++) {
                            let competencia_atleta = {
                                id_atleta: req.body.id_atleta[i],
                                id_competencia: rows.insertId
                            }
                            conexion.query('INSERT INTO competencia_atleta SET ?', competencia_atleta, (err, rows) => {
                                if (err != null) {
                                    console.log("error guardando competencia_atleta")
                                } else {
                                    count = count + 1;
                                    if (count == req.body.id_atleta.length) {
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
            if (err != null) {}
            conexion.query('SELECT * FROM competencia  WHERE finalizado=0', (err, rows) => {
                if (err != null) {}
                res.render('competencia/listar', {
                    datosCompetencia: rows
                })
            })
        })
    })
    //DELETE//
    .post('/competencia/eliminar/:competencia_id', (req, res, next) => {
        let competencia_id = req.params.competencia_id
        req.getConnection((err, conexion) => {
            conexion.query('DELETE FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, rows) => {
                if (err) {} else {
                    conexion.query('DELETE FROM competencia WHERE id = ?', competencia_id, (err, rows) => {
                        if (err) {} else {
                            res.redirect('/competencia/listar')
                        }
                    })
                }
            })
        })
    })
    //EDIT//
    .get('/competencia/modificar/:competencia_id', (req, res, next) => {
        let competencia_id = req.params.competencia_id
        req.getConnection((err, conexion) => {
            conexion.query('SELECT * FROM competencia comp WHERE comp.id = ?', competencia_id, (err, rows) => {
                if (err) throw err
                if (rows.length <= 0) {
                    res.redirect('/competencia/listar')
                } else {
	                if (rows[0].id_categoria == '1') {
	                    conexion.query('SELECT at.id, at.cedula, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre, cat.nombre categoria_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria cat ON at.id_categoria=cat.id', (err, atletas) => {
							conexion.query('SELECT * FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, compe_atleta) => {
	                    	/*console.log(rows)
	                    	console.log(atletas)
	                    	console.log(compe_atleta)*/
	                    	res.render('competencia/modificar', {
                                    datosCompe: rows,
                                    datosAtletas: atletas,
                                    datosCompeAtleta: compe_atleta
                                })
	                    })
						})
	                } else {
	                    conexion.query('SELECT at.id, at.cedula, at.primer_nombre, at.primer_apellido, cl.nombre club_nombre, cat.nombre categoria_nombre FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id LEFT JOIN categoria cat ON at.id_categoria=cat.id where at.id_categoria = ?', rows[0].id_categoria, (err, atletas) => {
							conexion.query('SELECT * FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, compe_atleta) => {
	                    	/*console.log(rows)
	                    	console.log(atletas)
	                    	console.log(compe_atleta)*/
	                    	res.render('competencia/modificar', {
                                    datosCompe: rows,
                                    datosAtletas: atletas,
                                    datosCompeAtleta: compe_atleta
                                })
	                    	})
	                    })
	                }
	            }
	        })
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
		req.getConnection((err , conexion) => {
			conexion.query('UPDATE competencia SET ? WHERE id = ' + competencia_id, competencia, (err, result) =>{                 
				conexion.query('SELECT * FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, compe_atleta) =>{                 
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
				})
			})
		})
		res.redirect('../listar')
    })

    //INICIAR//
    .get('/competencia/iniciar', (req, res, next) => {
        req.getConnection((err, conexion) => {
            if (err != null) {}
            conexion.query('SELECT * FROM competencia WHERE finalizado = 0', (err, rows) => {
                if (err != null) {}
                res.render('competencia/iniciar', {
                    datosCompetencia: rows
                })
            })
        })
    })
    .post('/competencia/competencia-atleta', (req, res, next) => {
        req.getConnection((err, conexion) => {
            if (err != null) {}
            let data = {
                atleta_id: req.body.atleta_id,
                competencia_id: req.body.competencia_id,
                tiempo: req.body.tiempo
            }
            conexion.query('INSERT INTO competencia_atleta SET ?', data, (err, rows) => {
                if (err != null) {}
            })
        })
    })

module.exports = router