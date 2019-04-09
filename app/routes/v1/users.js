/* global UsersControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .post('/register', UsersControllers.register)
  .post('/login', UsersControllers.login)
  .get('/request-token', AuthHelper.requiresAccessToken, UsersControllers.requestToken)

module.exports = Route
