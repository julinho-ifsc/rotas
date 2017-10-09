const {
  InvalidClientPermissionsError,
  InvalidClientError,
  UnauthorizedUserError
} = require('../core/errors')
const ClientsService = require('./service')

async function createClient(req, res, next) {
  try {
    if (!Object.prototype.hasOwnProperty.call(res.locals, 'userInfo')) {
      throw new UnauthorizedUserError()
    }

    const {name, key, permissions} = req.body
    const resourceOwner = res.locals.userInfo.role
    const clientsService = new ClientsService(res.locals.databaseConnection)
    const client = await clientsService.createClient({
      name,
      key,
      permissions,
      resourceOwner
    })

    return res.status(201).json(client)
  } catch (err) {
    if (err.name === InvalidClientPermissionsError.name) {
      return res.status(400).json({
        message: 'Invalid client permissions'
      })
    }

    if (err.name === UnauthorizedUserError.name) {
      return res.status(401).json({
        message: 'Unauthorized user'
      })
    }

    next(err)
  }
}

// WIP
async function deleteClient(req, res, next) {
  try {
    const clientId = req.params.clientId

    if (isNaN(clientId)) {
      throw new InvalidClientError()
    }

    const clientsService = new ClientsService(res.locals.databaseConnection)
    await clientsService.deleteClient(clientId)

    return res.json({message: `Client ${clientId} deleted with success`})
  } catch (err) {
    if (err.name === InvalidClientError.name) {
      return res.status(400).json({
        message: 'Invalid client id'
      })
    }

    next(err)
  }
}

module.exports = {
  createClient,
  deleteClient
}
