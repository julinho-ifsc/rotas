const {UnauthorizedUserError} = require('../core/errors')
const {signToken, verifyToken} = require('../core/token')
const {verifyPassword} = require('../core/password-hash')
const {getUserByEmail} = require('../users/repository')

async function generateToken(email, password) {
  const user = await getUserByEmail(email)
  const userIsAuthorized = await verifyPassword(password, user.password)

  if (userIsAuthorized === false) {
    throw new UnauthorizedUserError()
  }

  return signToken({
    role: user.role_id,
    name: user.name,
    email
  })
}

async function authenticate(token) {
  return verifyToken(token)
}

module.exports = {
  generateToken,
  authenticate
}
