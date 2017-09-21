const db = require('../config/database')

async function getAll() {
  return db('routes_point')
    .join('routes', 'routes.id', 'routes_point.route_id')
    .join('points', 'points.id', 'routes_point.point_id')
    .select(
      'routes.id',
      'routes.name',
      'points.id as point',
      'points.rfid as rfid',
      'routes_point.position',
      'points.name as pointName'
    )
}

async function getOne(id) {
  return db('routes_point')
    .join('routes', 'routes.id', 'routes_point.route_id')
    .join('points', 'points.id', 'routes_point.point_id')
    .select(
      'routes.id',
      'routes.name',
      'points.id as point',
      'points.rfid as rfid',
      'routes_point.position',
      'points.name as pointName'
    )
    .where('routes.id', id)
}

async function deleteOne(id) {
  await db('routes_point').where('route_id', id).del()
  return db('routes').where('id', id).del()
}

async function createRoute({name, points}) {
  const [routeId] = await db('routes').insert({name}).returning('id')
  await db('routes_point').insert(
    points.map((point, index) => ({
      route_id: routeId,
      point_id: point,
      position: index
    }))
  )
  return routeId
}

module.exports = {
  getAll,
  getOne,
  deleteOne,
  createRoute
}
