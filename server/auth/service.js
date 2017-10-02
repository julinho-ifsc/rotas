const {UnauthorizedUserError} = require('../core/errors')
const {signToken} = require('../core/token')
const {verifyPassword} = require('../core/password-hash')

class AuthenticationService {
  constructor(repository) {
    this.repository = repository
  }

  async generateToken(email, password) {
    const user = await this.repository.getUserByEmail(email)

    if (!user) {
      throw new UnauthorizedUserError()
    }

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
}

module.exports = AuthenticationService
