const {generateToken} = require('../services/auth')
const {UnauthorizedUserError} = require('../core/errors')

async function login(req, res, next) {
  try {
    const {email, password} = req.body
    const token = await generateToken(email, password)

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
