const {clientHasValidPermissions} = require('../core/client-permissions')
const {getAllPermissions} = require('../repositories/permissions')
const {InvalidClientPermissionsError} = require('../core/errors')
const repository = require('../repositories/clients')

async function createClient({name, key, permissions, resourceOwner}) {
  const resourceOwnerPermissions = await getAllPermissions(resourceOwner)

  if (!clientHasValidPermissions(resourceOwnerPermissions, permissions)) {
    throw new InvalidClientPermissionsError()
  }

  const id = await repository.createClient({name, key, permissions})
  await repository.addClientPermissions(id, permissions)

  return {
    id,
    name,
    key,
    permissions
  }
}

module.exports = {
  createClient
}
