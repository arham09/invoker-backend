/* global AmountsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', AuthHelper.requiresAccessToken, AmountsControllers.get)
  .post('/add', AuthHelper.requiresAccessToken, AmountsControllers.createAmount)
  .patch('/edit/:amountId', AuthHelper.requiresAccessToken, AmountsControllers.updateAmount)
  .delete('/delete/:amountId', AuthHelper.requiresAccessToken, AmountsControllers.deleteAmount)

module.exports = Route
