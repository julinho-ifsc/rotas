class PermissionsRepository {
  constructor(db) {
    this.db = db
  }

  async isAuthorized({resourceId, roleId, action}) {
    const authorizations = await this.db('permissions')
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

  async getAllPermissions(roleId) {
    return this.db('permissions')
      .select('create', 'read', 'update', 'delete', 'resource_id')
      .where('role_id', roleId)
  }
}

module.exports = PermissionsRepository
