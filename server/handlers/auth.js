const {AuthorizationTypeError} = require('../core/errors')
const {verifyToken} = require('../core/token')
const ClientsService = require('../clients/service')

async function verifyAuthorization(req, res, next) {
  try {
    const authorization = req.get('Authorization')

    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new AuthorizationTypeError()
    }

    const token = authorization.replace('Bearer ', '')

    if (Object.prototype.hasOwnProperty.call(req.query, 'client_id')) {
      const clientId = req.query.client_id
      const clientsService = new ClientsService(res.locals.databaseConnection)
      await clientsService.verifyClientToken(clientId, token)
      res.locals.clientId = clientId
    } else {
      res.locals.userInfo = await verifyToken(token)
    }

    next()
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
}

module.exports = {
  verifyAuthorization
}
