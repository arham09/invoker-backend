/* global _ */

'use strict'

const async = require('async')
const spendingModel = require('../models/spendings')
const redisCache = require('../libs/RedisCache')

exports.getSpending = (req, res) => {
  const key = `get-spending-all`

  async.waterfall([
    (cb) => {
      redisCache.get(key, spendings => {
        if (spendings) {
          return MiscHelper.responses(res, spendings)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      spendingModel.getSpend(req, (errSpend, resultSpend) => {
        cb(errSpend, resultSpend)
      })
    },
    (dataSpend, cb) => {
      redisCache.setex(key, 1800, dataSpend)
      console.log(`${key} is cached`)
      cb(null, dataSpend)
    }
  ], (errSpends, resultSpends) => {
    if (!errSpends) {
      return MiscHelper.responses(res, resultSpends)
    } else {
      return MiscHelper.errorCustomStatus(res, resultSpends)
    }
  })
}

exports.createSpending = (req, res) => {
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('description', 'description is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const data = {
    name: req.body.name,
    description: req.body.description,
    status: 1,
    created_at: new Date(),
    updated_at: new Date()
  }

  spendingModel.insertSpend(req, data, (errInsert, resultInsert) => {
    if (!errInsert) {
      redisCache.delwild(`get-spending-*`)
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert)
    }
  })
}

exports.updateSpending = (req, res) => {
  req.checkParams('spendingId', 'spendingId is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      spendingModel.checkSpend(req, req.params.spendingId, (err, result) => {
        if (_.isEmpty(result) || err) {
          return MiscHelper.errorCustomStatus(res, { message: 'Data is not exist' })
        } else {
          cb(null, result[0])
        }
      })
    },
    (dataPrev, cb) => {
      const name = _.result(req.body, 'name', dataPrev.name)
      const description = _.result(req.body, 'description', dataPrev.description)

      const data = {
        name: name,
        description: description,
        updated_at: new Date()
      }

      spendingModel.updateSpend(req, data, req.params.spendingId, (errUpdate, resultUpdate) => {
        redisCache.delwild(`get-spending-*`)
        cb(errUpdate, resultUpdate)
      })
    }
  ], (errUpdate, resultUpdate) => {
    if (!errUpdate) {
      return MiscHelper.responses(res, resultUpdate)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdate)
    }
  })
}

exports.deleteSpending = (req, res) => {
  let abc = 0
  req.checkParams('spendingId', 'spendingId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      spendingModel.checkSpend(req, req.params.spendingId, (err, result) => {
        if (_.isEmpty(result) || err) {
          return MiscHelper.errorCustomStatus(res, { message: 'Data isn\' exist' })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      spendingModel.deleteSpend(req, req.params.spendingId, (errDelete, resultDelete) => {
        redisCache.delwild(`get-spending-*`)
        cb(errDelete, resultDelete)
      })
    }
  ], (errDelete, resultDelete) => {
    if (!errDelete) {
      return MiscHelper.responses(res, resultDelete)
    } else {
      return MiscHelper.errorCustomStatus(res, errDelete)
    }
  })
}
