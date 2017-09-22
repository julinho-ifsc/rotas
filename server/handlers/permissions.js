const PermissionsRepository = require('../permissions/repository')
const ResourcesRepository = require('../resources/repository')
const {UnauthorizedUserError} = require('../core/errors')

const verifyPermission = resourceName => action => async (req, res, next) => {
  try {
    const resourcesRepository = new ResourcesRepository(
      res.locals.databaseConnection
    )
    const resource = await resourcesRepository.getResourceIdByName(resourceName)

    const roleId = res.locals.userInfo.role
    const permissionsRepository = new PermissionsRepository(
      res.locals.databaseConnection
    )
    const userIsAuthorized = await permissionsRepository.isAuthorized({
      resourceId: resource.id,
      roleId,
      action
    })

    if (userIsAuthorized === false) {
      throw new UnauthorizedUserError()
    }

    next()
  } catch (err) {
    if (err.name === UnauthorizedUserError.name) {
      return res.status(401).json({
        message: 'Unauthorized user'
      })
    }
    next(err)
  }
}

module.exports = {
  verifyPermission
}
