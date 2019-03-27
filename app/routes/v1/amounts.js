/* global AmountsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', AmountsControllers.get)
  .post('/add', AmountsControllers.createAmount)
  .patch('/edit/:amountId', AmountsControllers.updateAmount)

module.exports = Route
