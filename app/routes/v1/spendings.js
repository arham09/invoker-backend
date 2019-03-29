/* global SpendingsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', SpendingsControllers.getSpending)
  .post('/add', SpendingsControllers.createSpending)
  .patch('/edit/:spendingId', SpendingsControllers.updateSpending)
  .delete('/delete/:spendingId', SpendingsControllers.deleteSpending)

module.exports = Route
