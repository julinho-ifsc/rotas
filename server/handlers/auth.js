const {authenticate} = require('../services/auth')

async function verifyAuthorization(req, res, next) {
  const token = req.get('Authorization')

  try {
    res.locals.userInfo = await authenticate(token)
  } catch (err) {
    console.log(err)
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

    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }

  next()
}

module.exports = {
  verifyAuthorization
}
