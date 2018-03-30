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
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('SELECT * FROM  categoria' , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.render('gestionar/categoria/listar', {listCategorias: rows})
			})
		})
	})
	//add
	.get('/gestionar/categoria/crear', (req, res , next) => {
		res.render('gestionar/categoria/crear')
	})
	.post('/gestionar/categoria/crear' , (req, res , next) => {
		let categoria = {
				nombre : req.body.nombre,
				sexo : req.body.sexo,
				descripcion : req.body.descripcion
			}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('INSERT INTO categoria SET ?' , categoria, (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.redirect('/gestionar/categoria')
			})
		})
	})
	//delete
	.post('/gestionar/categoria/eliminar/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('DELETE FROM categoria where id = ?' , categoria_id , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.redirect('/gestionar/categoria')
			})
		})
	})
	//edit
	.get('/gestionar/categoria/modificar/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
	        conexion.query('SELECT * FROM categoria WHERE id = ?' , categoria_id , (err, rows) =>{
	        	if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
	            if (rows.length <= 0) {
	                res.redirect('/gestionar/categoria')
	            }
	            res.render('gestionar/categoria/modificar', {
	                title: 'Editar Categoría', 
	                id: rows[0].id,
	                nombre: rows[0].nombre,
	                sexo: rows[0].sexo,
	                descripcion: rows[0].descripcion                    
	            })
	        })
	    })
	})
	.post('/gestionar/categoria/modificar/:categoria_id', (req, res , next) => {
		let categoria_id = req.params.categoria_id
		let cat = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
			sexo : 	req.body.sexo	
		}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('UPDATE categoria SET ? WHERE id = ' + categoria_id,cat, (err, result) =>{    
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}             
				res.redirect('/gestionar/categoria')
			})
		})
	})

	///crud de club
	//list
	.get('/gestionar/club', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('SELECT * FROM  club' , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.render('gestionar/club/listar', {listClub: rows})
			})
		})
	})
	//add
	.get('/gestionar/club/crear', (req, res , next) => {
		res.render('gestionar/club/crear')
	})
	.post('/gestionar/club/crear' , (req, res , next) => {
		console.log('body: ' + JSON.stringify(req.body));
		res.send(req.body);
		/*let club = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion
		}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('INSERT INTO club SET ?' , club, (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				res.send(rows)
				//res.redirect('/gestionar/club')
			})
		})*/
	})
	//delete
	.post('/gestionar/club/eliminar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		req.getConnection((err , conexion) => {
			conexion.query('DELETE FROM club WHERE id = ?' , club_id , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}else{
					res.redirect('/gestionar/club')
				}
			})
		})
	})
	//edit
	.get('/gestionar/club/modificar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
	        conexion.query('SELECT * FROM club WHERE id = ?' , club_id , (err, rows) =>{
	            if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
	            if (rows.length <= 0) {
	                res.redirect('/gestionar/club')
	            }
	            res.render('gestionar/club/modificar', {
	            	title: 'Editar Club', 
	            	id: rows[0].id,
	            	nombre: rows[0].nombre,
	            	descripcion: rows[0].descripcion                    
	            })
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
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('UPDATE club SET ? WHERE id = ' + club_id, club, (err, result) =>{  
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}               
				res.redirect('/gestionar/club')
			})
		})
	})


	//CRUD ATLETAS
	.get('/gestionar/atleta', (req, res , next) => {
   req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('SELECT * FROM  atleta' , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}else{
         			  conexion.query('SELECT * FROM  club' , (err , club) =>{
        			if (err != null){
        
        			}else{
         		 conexion.query('SELECT * FROM  categoria' , (err , categorias) =>{
        			if (err != null){
        
       			}
        			res.render('gestionar/atleta/listar',{categorias: categorias, club: club,listAtleta: rows})
     			})}
     				 })}
			})
		})
  })


 .get('/gestionar/atleta', (req, res , next) => {
    req.getConnection((err , conexion) => {
      if (err != null){
        
      }
      conexion.query('SELECT * FROM  club' , (err , club) =>{
        if (err != null){
        
        }else{
          conexion.query('SELECT * FROM  categoria' , (err , categorias) =>{
        if (err != null){
        
        }
        res.render('gestionar/atleta/listar',{categorias: categorias, club: club})
      })}
      })

    })
  })



	.get('/gestionar/atleta/crear', (req, res , next) => {
		res.render('gestionar/atleta/crear')
	})

	.post('/gestionar/atleta/crear' , (req, res , next) => {
    let atleta = {
      primer_nombre : req.body.primer_nombre,
      segundo_nombre : req.body.segundo_nombre,
      primer_apellido : req.body.primer_apellido,
      segundo_apellido : req.body.segundo_apellido,
      cedula : req.body.cedula,
      fecha_nacimiento : req.body.fecha_nacimiento,
      id_club : req.body.id_club,
      id_categoria : req.body.id_categoria
    }
    req.getConnection((err , conexion) => {
      if (err){
        res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
      }
      conexion.query('INSERT INTO atleta SET ?' , atleta, (err , rows) =>{
        if (err){
          res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
        }
        res.redirect('/gestionar/atleta')
      })
    })
  })
	.post('/gestionar/atleta/eliminar/:atleta_id', (req, res , next) => {
		let atleta_id = req.params.atleta_id
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			conexion.query('DELETE FROM atleta where id = ?' , atleta_id , (err , rows) =>{
				if (err){
					res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
				}
					res.redirect('gestionar/atleta')
			})
		})
	})

.get('/gestionar/atleta/modificar/:atleta_id', (req, res , next) => {
		res.render('gestionar/atleta/modificar')
	})


module.exports = router