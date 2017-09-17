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
  const user = await db('users')
    .returning(['id', 'role_id', 'email', 'name'])
    .insert({
      role_id: role,
      password,
      email,
      name
    })
  console.log(user)
  return user
}

module.exports = {
  getUserByEmail,
  getAllUsers,
  getOneUser,
  createUser
}
