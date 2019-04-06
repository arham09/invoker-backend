/* global SpendingsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', AuthHelper.requiresAccessToken, SpendingsControllers.getSpending)
  .post('/add', AuthHelper.requiresAccessToken, SpendingsControllers.createSpending)
  .patch('/edit/:spendingId', AuthHelper.requiresAccessToken, SpendingsControllers.updateSpending)
  .delete('/delete/:spendingId', AuthHelper.requiresAccessToken, SpendingsControllers.deleteSpending)

module.exports = Route
