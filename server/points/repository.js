const db = require('../config/database')

async function getAll() {
  return db('points').select('id', 'rfid', 'name')
}

async function getOne(id) {
  return db('points').first('id', 'name', 'rfid').where('id', id)
}

async function createPoint(rfid, name) {
  return db('points').returning('id').insert({rfid, name})
}

async function deletePoint(id) {
  return db('points').where('id', id).del()
}

async function updatePoint(id, body) {
  return db('points').where('id', id).update(body)
}

module.exports = {
  getAll,
  getOne,
  createPoint,
  deletePoint,
  updatePoint
}
