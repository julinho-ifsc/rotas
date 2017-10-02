const PermissionsRepository = require('./repository')

async function getAll(req, res, next) {
  try {
    const permissionsRepository = new PermissionsRepository(
      res.locals.databaseConnection
    )

    if (Object.prototype.hasOwnProperty.call(res.locals, 'userInfo')) {
      const roleId = res.locals.userInfo.role

      return res.json(
        await permissionsRepository.getResourcePermissions(roleId)
      )
    }

    if (Object.prototype.hasOwnProperty.call(res.locals, 'clientId')) {
      const clientId = res.locals.clientId
      return res.json(
        await permissionsRepository.getClientPermissions(clientId)
      )
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll
}
