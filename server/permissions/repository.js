const db = require('../config/database')

async function isAuthorized({resourceId, roleId, action}) {
  const authorizations = await db('permissions')
    .join('resources', 'resources.id', 'permissions.resource_id')
    .join('roles', 'roles.id', 'permissions.role_id')
    .select('permissions.' + action)
    .where({
      'resources.id': resourceId,
      'roles.id': roleId
    })

  if (authorizations === null || authorizations.length === 0) {
    return false
  }

  if (authorizations[0][action]) {
    return true
  }

  return false
}

async function getAllPermissions(roleId) {
  return db('permissions')
    .select('create', 'read', 'update', 'delete', 'resource_id')
    .where('role_id', roleId)
}

module.exports = {
  isAuthorized,
  getAllPermissions
}
