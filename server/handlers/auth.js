const {AuthorizationTypeError} = require('../core/errors')
const {authenticate} = require('../auth/service')

async function verifyAuthorization(req, res, next) {
  try {
    const token = req.get('Authorization')

    if (!token || !token.startsWith('Bearer')) {
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
