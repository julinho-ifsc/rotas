class UsersRepository {
  constructor(db) {
    this.db = db
  }

  async getUserByEmail(email) {
    return this.db('users')
      .first('name', 'role_id', 'password')
      .where('email', email)
  }

  async getAllUsers() {
    return this.db('users').select('id', 'name', 'role_id', 'email')
  }

  async getOneUser(userId) {
    return this.db('users')
      .first('id', 'name', 'role_id', 'email')
      .where('id', userId)
  }

  async createUser({role, password, email, name}) {
    return this.db('users').returning('id').insert({
      role_id: role,
      password,
      email,
      name
    })
  }

  async updateUser(id, body) {
    return this.db('users').where('id', id).update(body)
  }

  async deleteUser(id) {
    return this.db('users').where('id', id).del()
  }
}

module.exports = UsersRepository
