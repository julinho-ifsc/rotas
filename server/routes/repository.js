class RoutesRepository {
  constructor(db) {
    this.db = db
  }

  async getAll() {
    return this.db('routes_point')
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

  async getOne(id) {
    return this.db('routes_point')
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

  async deleteOne(id) {
    await this.db('routes_point').where('route_id', id).del()
    return this.db('routes').where('id', id).del()
  }

  async insertPointsByRoute(routeId, points) {
    return this.db('routes_point').insert(
      points.map((point, index) => ({
        route_id: routeId,
        point_id: point,
        position: index
      }))
    )
  }

  async createRoute({name, points}) {
    const [routeId] = await this.db('routes').insert({name}).returning('id')
    await this.insertPointsByRoute(routeId, points)
    return routeId
  }

  async updateRoute(id, {name, points}) {
    await this.db('routes').update({name}).where('id', id)
    await this.db('routes_point').where('route_id', id).del()
    await this.insertPointsByRoute(id, points)
  }
}

module.exports = RoutesRepository
