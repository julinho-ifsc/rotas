const {InvalidClientPermissionsError} = require('../core/errors')
const ClientsService = require('./service')

async function createClient(req, res, next) {
  try {
    const {name, key, permissions} = req.body
    const resourceOwner = res.locals.userInfo.role
    const clientsService = new ClientsService(res.locals.databaseConnection)
    const client = await clientsService.createClient({
      name,
      key,
      permissions,
      resourceOwner
    })

    return res.status(201).json({
      client
    })
  } catch (err) {
    if (err.name === InvalidClientPermissionsError.name) {
      return res.status(400).json({
        message: 'Invalid client permissions'
      })
    }

    next(err)
  }
}

module.exports = {
  createClient
}
