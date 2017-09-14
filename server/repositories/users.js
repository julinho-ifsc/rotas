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

module.exports = {
  getUserByEmail,
  getAllUsers,
  getOneUser
}
