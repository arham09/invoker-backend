/* global AmountsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', AmountsControllers.get)
  .post('/add', AmountsControllers.createAmount)

module.exports = Route
