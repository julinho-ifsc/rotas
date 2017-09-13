const db = require('../config/database')

async function getResourceIdByName(name) {
  return db.first('id').from('resources').where('name', name)
}

module.exports = {
  getResourceIdByName
}
