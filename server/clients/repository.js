const {NotFoundError} = require('../core/errors')

class ClientsRepository {
  constructor(db) {
    this.db = db
  }

  async list() {
    return this.db('clients').select('id', 'name')
  }

  async createClient(name, key) {
    return this.db('clients').returning('id').insert({name, public_key: key})
  }

  async addClientPermissions(clientId, permissions) {
    return this.db('clients_permission').insert(
      permissions.map(permission => ({
        ...permission,
        client_id: clientId
      }))
    )
  }

  async deleteClientPermissions(clientId) {
    return this.db('clients_permission').where('client_id', clientId).del()
  }

  async deleteClient(clientId) {
    return this.db('clients').where('id', clientId).del()
  }

  async getPublicKey(clientId) {
    const client = await this.db('clients')
      .where('id', clientId)
      .first('public_key')

    if (!client) {
      throw new NotFoundError()
    }

    const {public_key: publicKey} = client
    return publicKey
  }

  async isAuthorized({resourceId, clientId, action}) {
    const authorizations = await this.db('clients_permission')
      .join('resources', 'resources.id', 'clients_permission.resource_id')
      .join('clients', 'clients.id', 'clients_permission.client_id')
      .select('clients_permission.' + action)
      .where({
        'resources.id': resourceId,
        'clients.id': clientId
      })

    if (authorizations === null || authorizations.length === 0) {
      return false
    }

    if (authorizations[0][action]) {
      return true
    }

    return false
  }
}

module.exports = ClientsRepository
