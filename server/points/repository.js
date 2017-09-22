class PointsRepository {
  constructor(db) {
    this.db = db
  }

  async getAll() {
    return this.db('points').select('id', 'rfid', 'name')
  }

  async getOne(id) {
    return this.db('points').first('id', 'name', 'rfid').where('id', id)
  }

  async createPoint(rfid, name) {
    return this.db('points').returning('id').insert({rfid, name})
  }

  async deletePoint(id) {
    return this.db('points').where('id', id).del()
  }

  async updatePoint(id, body) {
    return this.db('points').where('id', id).update(body)
  }
}

module.exports = PointsRepository
