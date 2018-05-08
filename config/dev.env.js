'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://kong.phalcon.xin/"',
  WS_URL: '"ws://kong.phalcon.xin:8002"',
})
