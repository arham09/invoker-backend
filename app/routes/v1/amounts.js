/* global AmountsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', AuthHelper.requiresAccessToken, AmountsControllers.get)
  .post('/add', AmountsControllers.createAmount)
  .patch('/edit/:amountId', AmountsControllers.updateAmount)
  .delete('/delete/:amountId', AmountsControllers.deleteAmount)

module.exports = Route
