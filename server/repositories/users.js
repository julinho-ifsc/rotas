const db = require('../config/database')

async function getUserByEmail(email) {
  return db
    .first('name', 'role_id', 'password')
    .from('users')
    .where('email', email)
}

async function getAllUsers() {
  return db.select('id', 'name', 'role_id', 'email').from('users')
}

async function getOneUser(userId) {
  return db('users').first('id', 'name', 'role_id', 'email').where('id', userId)
}

async function createUser({role, password, email, name}) {
  return db('users').returning('id').insert({
    role_id: role,
    password,
    email,
    name
  })
}

async function updateUser(id, body) {
  return db('users').where('id', id).update(body)
}

async function deleteUser(id) {
  return db('users').where('id', id).del()
}

module.exports = {
  getUserByEmail,
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}
