'use strict'
require('dotenv').config()

global.env = process.env.NODE_ENV || 'development'

const autoload = require('./autoload')()

const path = require('path')
global.express = require('express')

global.CONFIG = require(path.join(__dirname, '/app/config'))
global._ = require('lodash')

const mysql = require('mysql')
const http = require('http')
const app = express()
const server = require('http').createServer(app)

app.config = CONFIG

const db = require('express-myconnection')

app.use(
  db(mysql, {
    host: CONFIG.DATABASE.HOST,
    user: CONFIG.DATABASE.USER,
    password: CONFIG.DATABASE.PASSWORD,
    database: CONFIG.DATABASE.DB
  })
)

autoload((err, result) => {
  if (err) throw err

  require(path.join(__dirname, '/app/config/express'))(app)

  server.listen(app.get('port'), () => {
    if (env === 'development') console.log(`\n✔ Asal - asalan project ${CONFIG.SERVER.BASE_WEBHOST} in ${env} mode`)
  })
})

process.on('uncaughtException', (err) => {
  console.error(new Date() + ' uncaughtException: ', err.message)
  console.error(err.stack)
  process.exit(1)
})

process.on('SIGINT', () => {
  process.exit(1)
})

module.exports.server = http.createServer(app)
module.exports.db = db
