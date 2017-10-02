const {UnauthorizedUserError} = require('../core/errors')
const UsersRepository = require('../users/repository')
const AuthenticationService = require('./service')

async function login(req, res, next) {
  try {
    const {email, password} = req.body
    const usersRepository = new UsersRepository(res.locals.databaseConnection)
    const authenticationService = new AuthenticationService(usersRepository)
    const token = await authenticationService.generateToken(email, password)

    return res.json({token})
  } catch (err) {
    if (err.name === UnauthorizedUserError.name) {
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    next(err)
  }
}

module.exports = {
  login
}
