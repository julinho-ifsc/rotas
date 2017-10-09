class RolesRepository {
  constructor(db) {
    this.db = db
  }

  async list() {
    return this.db('roles').select('id', 'name')
  }
}

module.exports = RolesRepository
