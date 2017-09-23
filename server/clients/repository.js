class ClientsRepository {
  constructor(db) {
    this.db = db
  }

  async createClient(name, key) {
    return this.db('clients').returning('id').insert({name, public_key: key})
  }

  async addClientPermissions(clientId, permissions) {
    return this.db('clients_permission').insert(
      permissions.map(permission => {
        permission.client_id = clientId
        return permission
      })
    )
  }

  async deleteClientPermissions(clientId) {
    return this.db('clients_permission').where('client_id', clientId).del()
  }

  async deleteClient(clientId) {
    return this.db('clients').where('id', clientId).del()
  }
}

module.exports = ClientsRepository
