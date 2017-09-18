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

async function updateUser(id, {role_id, password, email, name}) {
  const hashedPassword = await generateHash(password)
  return repository.updateUser(id, {
    role_id,
    password: hashedPassword,
    email,
    name
  })
}

async function updateUserField(id, body) {
  if (Object.prototype.hasOwnProperty.call(body, 'password')) {
    body.password = await generateHash(body.password)
  }

  return repository.updateUser(id, body)
}

async function deleteUser(id) {
  return repository.deleteUser(id)
}

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  updateUserField,
  deleteUser
}
