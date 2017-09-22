const {generateHash} = require('../core/password-hash')
const UsersRepository = require('./repository')

class UsersService {
  constructor(db) {
    this.db = db
  }

  async getAll() {
    const usersRepository = new UsersRepository(this.db)
    return usersRepository.getAllUsers()
  }

  async getOne(userId) {
    const usersRepository = new UsersRepository(this.db)
    return usersRepository.getOneUser(userId)
  }

  async createUser({role, password, email, name}) {
    const hashedPassword = await generateHash(password)
    const usersRepository = new UsersRepository(this.db)
    return usersRepository.createUser({
      role,
      password: hashedPassword,
      email,
      name
    })
  }

  async updateUser(id, {role_id, password, email, name}) {
    const hashedPassword = await generateHash(password)
    const usersRepository = new UsersRepository(this.db)
    return usersRepository.updateUser(id, {
      role_id,
      password: hashedPassword,
      email,
      name
    })
  }

  async updateUserField(id, body) {
    if (Object.prototype.hasOwnProperty.call(body, 'password')) {
      body.password = await generateHash(body.password)
    }

    const usersRepository = new UsersRepository(this.db)
    return usersRepository.updateUser(id, body)
  }

  async deleteUser(id) {
    const usersRepository = new UsersRepository(this.db)
    return usersRepository.deleteUser(id)
  }
}

module.exports = UsersService
