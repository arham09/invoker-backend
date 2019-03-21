/* global _ */

'use strict'

const async = require('async')
const testingModel = require('../models/testing')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  const key = `get-testing`

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
      testingModel.get(req, (errTest, resultTest) => {
        cb(errTest, resultTest)
      })
    },
    (dataTest, cb) => {
      redisCache.setex(key, 600, dataTest)
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
