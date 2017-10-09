class ResourcesRepository {
  constructor(db) {
    this.db = db
  }

  async getResourceIdByName(name) {
    return this.db('resources').first('id').where('name', name)
  }

  async list() {
    return this.db('resources').select('id', 'name')
  }
}

module.exports = ResourcesRepository
