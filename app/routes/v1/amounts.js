/* global AmountsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', AmountsControllers.get)

module.exports = Route
