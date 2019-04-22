/* global describe it before */

const App = require('../app.js')
const supertest = require('supertest')
const CONFIG = require('../app/config/index')
const should = require('should')
const expect = require('chai').expect
const assert = require('assert')
const _ = require('lodash')

const server = supertest(App.server)

let token = null
const email = 'arham.abiyan@gmail.com'
const password = 'Asulahlo31>'

before((done) => {
  done()
})

describe('Login Page', () => {
  it('Login Page to get token', (done) => {
    server
      .post('/v1/users/login')
      .expect('Content-type', /json/)
      .set('Authorization', 'X-CONTROL-APP')
      .send({ email: email, password: password })
      .expect(200)
      .end((err, res) => {
        token = res.body.data.token
        res.status.should.equal(200)
        done()
      })
  })
})

describe('Get All Amount', () => {
  it('GET all amount should get 200 page', (done) => {
    server
      .get('/v1/amounts/get')
      .expect('Content-type', /json/)
      .set('Authorization', 'X-CONTROL-APP')
      .set('X-CONTROL-USER', 2)
      .set('X-TOKEN-CLIENT', token)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200)
        done()
      })
  })
})

describe('Post Amount', () => {
  it('Post amount', (done) => {
    server
      .post('/v1/amounts/add')
      .expect('Content-type', /json/)
      .set('Authorization', 'X-CONTROL-APP')
      .set('X-CONTROL-USER', 2)
      .set('X-TOKEN-CLIENT', token)
      .send({ userId: 2, spendingId: 1, amount: 1239 })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200)
        done()
      })

  })
})

after((done) => {
  App.server.close()
  done()
})
