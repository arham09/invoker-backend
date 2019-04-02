/* global UsersControllers */

'use strict'

var Route = express.Router()

Route
  .post('/register', UsersControllers.register)

module.exports = Route
