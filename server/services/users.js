const repository = require('../repositories/users')
const {generateHash} = require('../core/password-hash')

async function getAll() {
  return repository.getAllUsers()
}

async function getOne(userId) {
  return repository.getOneUser(userId)
}

async function createUser({role, password, email, name}) {
  const hashedPassword = await generateHash(password)
  return repository.createUser({role, password: hashedPassword, email, name})
}

module.exports = {
  getAll,
  getOne,
  createUser
}
