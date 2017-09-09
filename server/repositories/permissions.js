// SELECT role.name as role, r.name as resource, p.create, p.read, p.update, p.delete FROM permissions as p INNER JOIN resources AS r ON p.resource_id = r.id INNER JOIN roles AS role ON p.role_id = role.id WHERE r.id = 1 AND role.id = 3;

async function getResourceIdByName(name) {
  return knex.select('id').from('resources').where('name', name)
}

async function getRoleIdByUserId(userId) {
  return knex.select('role_id').from('users').where('id', userId)
}

async function isAuthorized({resouceId, roleId, action}) {
  return knex('permissions')
    .join('resources', 'resources.id', 'permissions.resource_id')
    .join('roles', 'roles.id', 'permission.role_id')
    .select('users.' + action)
    .where({
      'resources.id': resouceId,
      'roles.id': roleId
    })
}
