'use strict'

var mysql = require('mysql'),
	expressMyconnection = require('express-myconnection'),
	dbOptions = {
      host: 'localhost',
      port: 3307,
      user: 'root',
      password: '',
      database: 'atletismo_IDT'
    },
    db = expressMyconnection(mysql , dbOptions , 'request')

module.exports = db