'use strict'

var mysql = require('mysql'),
	expressMyconnection = require('express-myconnection'),
	dbOptions = {
      host: 'coneccion',
      user: 'usuario-principal',
      password: '123456',
      port: 3307,
      database: 'atletismo_IDT'
    },
    db = expressMyconnection(mysql , dbOptions , 'request')
 
module.exports = db