const {UnauthorizedUserError} = require('../core/errors')
const {signToken} = require('../core/token')
const {verifyPassword} = require('../core/password-hash')
const UsersRepository = require('../users/repository')

class AuthenticationService {
  constructor(db) {
    this.db = db
  }

  async generateToken(email, password) {
    const usersRepository = new UsersRepository(this.db)
    const user = await usersRepository.getUserByEmail(email)

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
