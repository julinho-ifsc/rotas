const db = require('../config/database')
const service = require('../services/clients')
const {InvalidClientPermissionsError} = require('../core/errors')

async function createClient(req, res, next) {
  try {
    const {name, key, permissions} = req.body
    const resourceOwner = res.locals.userInfo.role
    const client = await service.createClient({
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

async function getAll(req, res, next) {
  try {
    const publicKeys = await db('clients').select('public_key')
    return res.json(
      publicKeys.map(key => {
        key.public_key = key.public_key.toString('utf-8')
        return key
      })
    )
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createClient,
  getAll
}
