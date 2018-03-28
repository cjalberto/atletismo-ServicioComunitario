'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	
	///CRUD CATEGORIAS
	//list
	.get('/gestionar/categoria', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
				
			}else{
				conexion.query('SELECT * FROM  categoria' , (err , rows) =>{
					if (err != null){
			
					}else{
						res.render('gestionar/categoria/listar', {listCategorias: rows})
					}
				})
			}
		})
	})
	//add
	.get('/gestionar/categoria/crear', (req, res , next) => {
		res.render('gestionar/categoria/crear')
	})
	.post('/gestionar/categoria/crear' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let categoria = {
				nombre : req.body.nombre,
				descripcion : req.body.descripcion
			}
			conexion.query('INSERT INTO categoria SET ?' , categoria, (err , rows) =>{
				res.redirect('/gestionar/categoria')
			})
		})
	})
	//delete
	.post('/gestionar/categoria/eliminar/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM categoria where id = ?' , categoria_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('/gestionar/categoria')
				}
			})
		})
	})
	//edit
	.get('/gestionar/categoria/modificar/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		req.getConnection((err , conexion) => {
	        conexion.query('SELECT * FROM categoria WHERE id = ?' , categoria_id , (err, rows) =>{
	            if(err) throw err
	            if (rows.length <= 0) {
	                res.redirect('/gestionar/categoria')
	            }
	            else { 
	                res.render('gestionar/categoria/modificar', {
	                    title: 'Editar Categoría', 
	                    id: rows[0].id,
	                    nombre: rows[0].nombre,
	                    descripcion: rows[0].descripcion                    
	                })
	            }
	        })
	    })
	})
	.post('/gestionar/categoria/modificar/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		let cat = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion			
		}
		req.getConnection((err , conexion) => {
			conexion.query('UPDATE categoria SET ? WHERE id = ' + categoria_id, cat, (err, result) =>{                 
				res.redirect('/gestionar/categoria')
			})
		})
	})

	///crud de club
	//list
	.get('/gestionar/club', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null){
			
			}else{
				conexion.query('SELECT * FROM  club' , (err , rows) =>{
					if (err != null){
					
					}else{
					res.render('gestionar/club/listar', {listClub: rows})
				}
			})
			}
		})
	})
	//add
	.get('/gestionar/club/crear', (req, res , next) => {
		res.render('gestionar/club/crear')
	})
	.post('/gestionar/club/crear' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			let club = {
				nombre : req.body.nombre,
				descripcion : req.body.descripcion
			}
			conexion.query('INSERT INTO club SET ?' , club, (err , rows) =>{
				res.redirect('/gestionar/club')
			})
		})
	})
	//delete
	.post('/gestionar/club/eliminar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM club where id = ?' , club_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('/gestionar/club')
				}
			})
		})
	})
	//edit
	.get('/gestionar/club/modificar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		req.getConnection((err , conexion) => {
	        conexion.query('SELECT * FROM club WHERE id = ?' , club_id , (err, rows) =>{
	            if(err) throw err
	            if (rows.length <= 0) {
	                res.redirect('/gestionar/club')
	            }
	            else { 
	                res.render('gestionar/club/modificar', {
	                    title: 'Editar Club', 
	                    id: rows[0].id,
	                    nombre: rows[0].nombre,
	                    descripcion: rows[0].descripcion                    
	                })
	            }
	        })
	    })
	})
	.post('/gestionar/club/modificar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		let club = {
			nombre: req.body.nombre, 
			descripcion: req.body.descripcion
		}
		req.getConnection((err , conexion) => {
			conexion.query('UPDATE club SET ? WHERE id = ' + club_id, club, (err, result) =>{                 
				res.redirect('/gestionar/club')
			})
		})
	})


	//CRUD ATLETAS
	.get('/gestionar/atleta', (req, res , next) => {
		res.render('gestionar/atleta/listar');
	})
	.get('/gestionar/atleta/crear', (req, res , next) => {
		res.render('gestionar/atleta/crear')
	})
	.get('/competidor/modificar', (req, res , next) => {
		res.render('competidor/modificar')
	})
	.get('/competidor/listar', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query('SELECT * FROM  atleta' , (err , rows) =>{
				let listCompetidores = rows
				res.render('competidor/listar')
			})
		})
	})
	.post('/crear/competidor' , (req, res , next) => {
		req.getConnection((err , conexion) => {
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
			conexion.query('DELETE FROM atleta where id = ?' , competidor_id , (err , rows) =>{
				if (err){

				}
				else{
					res.redirect('competidor/listar')
				}
			})
		})
	})



module.exports = router