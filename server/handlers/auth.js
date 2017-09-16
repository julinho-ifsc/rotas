const {authenticate} = require('../services/auth')
const {AuthorizationTypeError} = require('../core/errors')

async function verifyAuthorization(req, res, next) {
  const token = req.get('Authorization')

  try {
    if (!token.startsWith('Bearer')) {
      throw new AuthorizationTypeError()
    }

    res.locals.userInfo = await authenticate(token.replace('Bearer ', ''))
  } catch (err) {
    if (err.name === AuthorizationTypeError.name) {
      return res.status(401).json({
        message: 'Wrong authorization type'
      })
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Expired token'
      })
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Unauthorized user'
      })
    }

    next(err)
  }

  next()
}

module.exports = {
  verifyAuthorization
}
