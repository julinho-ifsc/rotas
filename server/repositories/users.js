const db = require('../config/database')

async function getUserByEmail(email) {
  return db
    .first('name', 'role_id', 'password')
    .from('users')
    .where('email', email)
}

module.exports = {
  getUserByEmail
}
