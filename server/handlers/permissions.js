const {isAuthorized} = require('../permissions/repository')
const {getResourceIdByName} = require('../resources/repository')
const {UnauthorizedUserError} = require('../core/errors')

const verifyPermission = resourceName => action => async (req, res, next) => {
  try {
    const resource = await getResourceIdByName(resourceName)

    const roleId = res.locals.userInfo.role
    const userIsAuthorized = await isAuthorized({
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
