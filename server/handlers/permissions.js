const {isAuthorized} = require('../permissions/repository')
const {getResourceIdByName} = require('../resources/repository')

const verifyPermission = resourceName => action => async (req, res, next) => {
  const resource = await getResourceIdByName(resourceName)
  const roleId = res.locals.userInfo.role

  try {
    const userIsAuthorized = await isAuthorized({
      resourceId: resource.id,
      roleId,
      action
    })

    if (userIsAuthorized === false) {
      return res.status(401).json({
        message: 'Unauthorized user'
      })
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  verifyPermission
}
