/* global AmountsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', AmountsControllers.get)
  .post('/add', AmountsControllers.createAmount)
  .patch('/edit/:amountId', AmountsControllers.updateAmount)
  .delete('/delete/:amountId', AmountsControllers.deleteAmount)

module.exports = Route
