const db = require('../config/database')

async function getUserByEmail(email) {
  return db
    .first('name', 'role_id', 'password')
    .from('users')
    .where('email', email)
}

async function getAllUsers() {
  return db.select('name', 'role_id', 'email').from('users')
}

module.exports = {
  getUserByEmail,
  getAllUsers
}
