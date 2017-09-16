const db = require('../config/database')

async function createClient(name, key) {
  return db('clients').returning('id').insert({name, key})
}

async function addClientPermissions(clientId, permissions) {
  return db('clients_permission').insert(
    permissions.map(permission => {
      permission.client_id = clientId
      return permission
    })
  )
}

module.exports = {
  createClient,
  addClientPermissions
}
