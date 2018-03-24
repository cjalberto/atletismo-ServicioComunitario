'use strict'

var mysql = require('mysql'),
	expressMyconnection = require('express-myconnection'),
	dbOptions = {
      host: 'localhost',
<<<<<<< HEAD
      port: 3307,
      user: 'root',
      password: '',
      database: 'atletismo_IDT'
=======
      user: 'root',
      password: '',
      port: 3306,
      database: 'atletismo_idt'
>>>>>>> master
    },
    db = expressMyconnection(mysql , dbOptions , 'request')

module.exports = db