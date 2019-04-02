/* global UsersControllers */

'use strict'

var Route = express.Router()

Route
  .post('/register', UsersControllers.register)
  .post('/login', UsersControllers.login)

module.exports = Route
