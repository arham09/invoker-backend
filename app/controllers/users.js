/* global _ */

'use strict'

const async = require('async')
// const moment = require('moment')
const isRealEmail = require('mailchecker/platform/node').isValid
const jsonwebtoken = require('jsonwebtoken')
const usersModel = require('../models/users')
// const redisCache = require('../libs/RedisCache')

exports.register = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()
  req.checkBody('confpassword', 'Confirm password is required').notEmpty()
  req.checkBody('fullname', 'fullname is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      if (req.body.password === req.body.confpassword) {
        cb(null)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Password is different', 400)
      }
    },
    (cb) => {
      const email = _.toLower(req.body.email)

      if (isRealEmail(email)) {
        cb(null, email)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Please Enter Your Email', 400)
      }
    },
    (email, cb) => {
      if (MiscHelper.validatePassword(req.body.password)) {
        cb(null, email)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Please Enter a valid password', 400)
      }
    },
    (email, cb) => {
      usersModel.getUserByEmail(req, email, (errUser, user) => {
        if (user && user.length > 0) {
          return MiscHelper.errorCustomStatus(res, 'Email already exists, please choose another email or do forgot password.')
        }
        cb(errUser)
      })
    },
    (cb) => {
      const salt = MiscHelper.generateSalt(18)
      const passwordHash = MiscHelper.setPassword(req.body.password, salt)
      const data = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: passwordHash.passwordHash,
        salt: passwordHash.salt,
        token: '',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      usersModel.insert(req, data, (errInsert, insert) => {
        cb(errInsert, insert)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser)
    }
  })
}

exports.login = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      usersModel.getUserByEmail(req, req.body.email, (errUser, user) => {
        if (!user) return MiscHelper.notFound(res, 'Email Not Found')
        const dataUser = _.result(user, '[0]')
        if (_.result(dataUser, 'salt')) {
          if (MiscHelper.setPassword(req.body.password, dataUser.salt).passwordHash === dataUser.password) {
            cb(errUser, dataUser)
          } else {
            return MiscHelper.errorCustomStatus(res, 'Email or password is invalid!', 400)
          }
        } else {
          return MiscHelper.errorCustomStatus(res, 'Email not found!', 404)
        }
      })
    },
    (user, cb) => {
      const data = {
        token: jsonwebtoken.sign({ iss: user.userid, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: CONFIG.TOKEN_EXPIRED }),
        updated_at: new Date()
      }

      usersModel.update(req, user.userid, data, (err, updateUser) => {
        user.token = data.token
        delete user.password
        delete user.salt
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

exports.logout = (req, res) => {
  const userId = parseInt(req.headers['x-control-user'])

  if (!userId) return MiscHelper.errorCustomStatus(res, 'UserID required.', 400)

  const data = {
    token: jsonwebtoken.sign({ iss: userId, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: CONFIG.TOKEN_EXPIRED }),
    updated_at: new Date()
  }

  usersModel.update(req, userId, data, (err, updateUser) => {
    if (err || !updateUser) return MiscHelper.errorCustomStatus(res, err || 'Failed Logout.', 400)
    return MiscHelper.responses(res, 'success logout.')
  })
}
