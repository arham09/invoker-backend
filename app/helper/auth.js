/* global CONFIG, _, MiscHelper */

'use strict'

const jsonwebtoken = require('jsonwebtoken')

const allowClientAccessAPI = [
  'X-CONTROL-APP'
]

exports.requiresAuthorization = (req, res, next) => {
  const reqHeaderSecretKey = req.headers.authorization

  if (_.isEmpty(reqHeaderSecretKey)) return MiscHelper.errorCustomStatus(res, 'Unauthorized, need access token to access this API route', 401)

  const internalAccess = _.includes(allowClientAccessAPI, reqHeaderSecretKey)

  if (!internalAccess) return MiscHelper.errorCustomStatus(res, 'Unauthorized, authorization value is invalid/expired', 401)

  next()
}

exports.requiresAccessToken = (req, res, next) => {
  const CLIENT_SECRET = CONFIG.CLIENT_SECRET
  const accessToken = req.headers['x-token-client']
  const userId = req.headers['x-control-user']

  jsonwebtoken.verify(accessToken, CLIENT_SECRET, (err, decoded) => {
    if (err && err.name === 'TokenExpiredError') return MiscHelper.errorCustomStatus(res, 'Unauthorized, access token is expired', 401)

    if (err && err.name === 'JsonWebTokenError') return MiscHelper.errorCustomStatus(res, 'Unauthorized, invalid access token', 401)

    if (parseInt(userId) !== parseInt(decoded.iss)) return MiscHelper.errorCustomStatus(res, 'Unauthorized, invalid access token', 401)

    next()
  })
}
