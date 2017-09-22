const {UnauthorizedUserError} = require('../core/errors')
const AuthenticationService = require('./service')

async function login(req, res, next) {
  try {
    const {email, password} = req.body
    const authenticationService = new AuthenticationService(
      res.locals.databaseConnection
    )
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
