/* global TestingControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', TestingControllers.get)

module.exports = Route
