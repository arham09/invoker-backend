/* global _ */

'use strict'

const async = require('async')
const amountModel = require('../models/amounts')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/amounts/get'
 *
 * @desc Get amounts
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const key = `get-amounts`

  async.waterfall([
    (cb) => {
      redisCache.get(key, tests => {
        if (tests) {
          return MiscHelper.responses(res, tests)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      amountModel.get(req, (errTest, resultTest) => {
        cb(errTest, resultTest)
      })
    },
    (dataTest, cb) => {
      redisCache.setex(key, 1800, dataTest)
      console.log(`${key} is cached`)
      cb(null, dataTest)
    }
  ], (errTests, resultTests) => {
    if (!errTests) {
      return MiscHelper.responses(res, resultTests)
    } else {
      return MiscHelper.errorCustomStatus(res, errTests, 404)
    }
  })
}

/*
 * POST : '/amounts/add'
 *
 * @desc Add amounts
 *
 * @body  {object} req - Bodies for request
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.spendingId - Id spending master
 * @body  {objectId} req.body.amount - amount
 *
 * @return {object} Request object
 */

exports.createAmount = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('spendingId', 'spendingId is required').notEmpty().isInt()
  req.checkBody('amount', 'amount is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const data = {
    userid: req.body.userId,
    spendingid: req.body.spendingId,
    amount: req.body.amount,
    status: 1,
    created_at: new Date(),
    updated_at: new Date()
  }

  amountModel.insertAmount(req, data, (errInsert, resultInsert) => {
    if (!errInsert) {
      redisCache.delwild(`get-amounts-*`)
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert, 400)
    }
  })
}

exports.updateAmount = (req, res) => {
  req.checkParams('amountId', 'amountId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      amountModel.checkAmount(req, req.params.amountId, (err, result) => {
        if (_.isEmpty(result) || err) {
          return MiscHelper.errorCustomStatus(res, { message: 'Data is not exist' })
        } else {
          cb(null, result)
        }
      })
    },
    (dataPrev, cb) => {
      const spendingId = _.result(req.body, 'spendingId', dataPrev.spendingid)
      const amount = _.result(req.body, 'amount', dataPrev.amount)

      const data = {
        spendingid: spendingId,
        amount: amount,
        updated_at: new Date()
      }

      amountModel.updateAmount(req, data, req.params.amountId, (errUpdate, resultUpdate) => {
        redisCache.delwild('get-amount-*')
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

exports.deleteAmount = (req, res) => {
  req.checkParams('amountId', 'amountId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      amountModel.checkAmount(req, req.params.amountId, (err, result) => {
        if (_.isEmpty(result) || err) {
          return MiscHelper.errorCustomStatus(res, { message: 'Data is not exist' })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      amountModel.deleteAmount(req, req.params.amountId, (errDelete, resultDelete) => {
        redisCache.delwild(`get-amount-*`)
        cb(errDelete, resultDelete)
      })
    }
  ], (errDel, resultDel) => {
    if (!errDel) {
      return MiscHelper.responses(res, resultDel)
    } else {
      return MiscHelper.errorCustomStatus(res, errDel)
    }
  })
}
