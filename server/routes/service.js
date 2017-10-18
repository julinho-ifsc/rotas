const RoutesRepository = require('./repository')
const {getPoint, sortPoints, initRouteList} = require('./utils')

class RoutesService {
  constructor(db) {
    this.db = db
  }

  async getAll() {
    const routesRepository = new RoutesRepository(this.db)
    const routes = await routesRepository.getAll()

    return Object.values(
      routes.reduce((previousValue, currentValue) => {
        if (
          Object.prototype.hasOwnProperty.call(previousValue, currentValue.id)
        ) {
          previousValue[currentValue.id].points.push(getPoint(currentValue))
        } else {
          previousValue[currentValue.id] = initRouteList(currentValue)
        }
        return previousValue
      }, {})
    ).map(route => {
      route.points = sortPoints(route.points)

      return route
    })
  }

  async getOne(id) {
    const routesRepository = new RoutesRepository(this.db)
    const route = await routesRepository.getOne(id)
    return route.reduce((previousValue, currentValue, currentIndex, array) => {
      if (currentIndex === 0) {
        return initRouteList(currentValue)
      }

      previousValue.points.push(getPoint(currentValue))

      if (currentIndex === array.length - 1) {
        previousValue.points = sortPoints(previousValue.points)
      }

      return previousValue
    }, {})
  }

  async findByName(name) {
    const routesRepository = new RoutesRepository(this.db)
    const route = await routesRepository.findByName(name)
    return route.reduce((previousValue, currentValue, currentIndex, array) => {
      if (currentIndex === 0) {
        return initRouteList(currentValue)
      }

      previousValue.points.push(getPoint(currentValue))

      if (currentIndex === array.length - 1) {
        previousValue.points = sortPoints(previousValue.points)
      }

      return previousValue
    }, {})
  }

  async createRoute({name, points}) {
    const routesRepository = new RoutesRepository(this.db)
    const id = await routesRepository.createRoute({name, points})
    return this.getOne(id)
  }

  async updateRoute(id, {name, points}) {
    const routesRepository = new RoutesRepository(this.db)
    await routesRepository.updateRoute(id, {name, points})
    return this.getOne(id)
  }
}

module.exports = RoutesService
