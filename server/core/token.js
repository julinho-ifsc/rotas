const fs = require('fs')
const {promisify} = require('util')
const path = require('path')
const jwt = require('jsonwebtoken')

const cert = fs.readFileSync(path.resolve(__dirname, '../../private.key'))

const sign = promisify(jwt.sign)

async function signToken(data) {
  return sign(data, cert, {
    algorithm: 'RS256',
    expiresIn: '2h'
  })
}

module.exports = {
  signToken
}
