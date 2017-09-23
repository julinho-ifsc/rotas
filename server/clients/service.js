const {clientHasValidPermissions} = require('../core/client-permissions')
const {InvalidClientPermissionsError} = require('../core/errors')
const PermissionsRespository = require('../permissions/repository')
const ClientsRepository = require('./repository')

class ClientsService {
  constructor(db) {
    this.db = db
  }

  async createClient({name, key, permissions, resourceOwner}) {
    const permissionsRespository = new PermissionsRespository(this.db)
    const resourceOwnerPermissions = await permissionsRespository.getAllPermissions(
      resourceOwner
    )

    if (!clientHasValidPermissions(resourceOwnerPermissions, permissions)) {
      throw new InvalidClientPermissionsError()
    }
    const clientsRepository = new ClientsRepository(this.db)
    const [id] = await clientsRepository.createClient(name, key)
    await clientsRepository.addClientPermissions(id, permissions)

    return {
      id,
      name,
      key,
      permissions
    }
  }

  async deleteClient(clientId) {
    const clientsRepository = new ClientsRepository(this.db)
    await clientsRepository.deleteClientPermissions(clientId)
    await clientsRepository.deleteClient(clientId)
  }
}

module.exports = ClientsService
