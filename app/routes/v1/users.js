/* global UsersControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .post('/register', UsersControllers.register)
  .post('/login', UsersControllers.login)

module.exports = Route
