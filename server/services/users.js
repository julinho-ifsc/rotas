const {getAllUsers} = require('../repositories/users')

async function getAll() {
  return getAllUsers()
}

module.exports = {
  getAll
}
