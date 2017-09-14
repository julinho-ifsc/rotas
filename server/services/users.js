const {getAllUsers, getOneUser} = require('../repositories/users')

async function getAll() {
  return getAllUsers()
}

async function getOne(userId) {
  return getOneUser(userId)
}

module.exports = {
  getAll,
  getOne
}
