'use strict'

const BASE_DOMAIN = process.env.BASE_DOMAIN

const CONFIG = {
  ROOT: process.cwd(),
  APP: {
    name: BASE_DOMAIN
  },
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DB: process.env.DATABASE_NAME
  },
  REDIS: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    options: {
      db: 0
    },
    auth_pass: process.env.REDIS_PASSWORD
  },
  SESSION_SECRET: process.env.SESSION_SECRET || 'zd_TEkgW5C_$8]j.',
  REQUEST_HEADERS: {
    Authorization: 'X_MONEY'
  }
}

module.exports = CONFIG
