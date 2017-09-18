const {clientHasValidPermissions} = require('../core/client-permissions')
const {InvalidClientPermissionsError} = require('../core/errors')
const {getAllPermissions} = require('../permissions/repository')
const repository = require('./repository')

async function createClient({name, key, permissions, resourceOwner}) {
  const resourceOwnerPermissions = await getAllPermissions(resourceOwner)

  if (!clientHasValidPermissions(resourceOwnerPermissions, permissions)) {
    throw new InvalidClientPermissionsError()
  }

  const [id] = await repository.createClient(name, key)
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
