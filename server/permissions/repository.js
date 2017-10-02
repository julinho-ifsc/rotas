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

  async getResourcePermissions(roleId) {
    return this.db('permissions')
      .join('resources', 'resources.id', 'permissions.resource_id')
      .select(
        'permissions.create',
        'permissions.read',
        'permissions.update',
        'permissions.delete',
        'resources.name'
      )
      .where('role_id', roleId)
  }

  async getClientPermissions(clientId) {
    return this.db('clients_permission')
      .join('resources', 'resources.id', 'clients_permission.resource_id')
      .select(
        'clients_permission.create',
        'clients_permission.read',
        'clients_permission.update',
        'clients_permission.delete',
        'resources.name'
      )
      .where('client_id', clientId)
  }
}

module.exports = PermissionsRepository
