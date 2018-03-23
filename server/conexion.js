'use strict'

var mysql = require('mysql'),
	expressMyconnection = require('express-myconnection'),
	dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
      database: 'atletismo_idt'
    },
    db = expressMyconnection(mysql , dbOptions , 'request')

module.exports = db