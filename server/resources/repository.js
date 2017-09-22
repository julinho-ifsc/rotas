class ResourcesRepository {
  constructor(db) {
    this.db = db
  }

  async getResourceIdByName(name) {
    return this.db('resources').first('id').where('name', name)
  }
}

module.exports = ResourcesRepository
