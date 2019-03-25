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

exports.createAmount = (req, res) => {

}
