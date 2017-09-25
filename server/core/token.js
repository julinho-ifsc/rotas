const fs = require('fs')
const {promisify} = require('util')
const path = require('path')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../private.key'))
const publicKey = fs.readFileSync(path.resolve(__dirname, '../../public.pem'))
const algorithm = 'RS256'

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)

async function signToken(data) {
  return sign(data, privateKey, {
    algorithm,
    expiresIn: '2h'
  })
}

async function verifyToken(token, key = publicKey) {
  return verify(token, key, {algorithms: [algorithm]})
}

module.exports = {
  signToken,
  verifyToken
}
