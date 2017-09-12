const {UnauthorizedUserError} = require('../core/errors')
const {signToken} = require('../core/token')
const {verifyPassword} = require('../core/password-hash')
const {getUserByEmail} = require('../repositories/users')

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

module.exports = {
  generateToken
}
