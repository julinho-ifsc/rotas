const routesRepository = require('./repository')
const {getPoint, sortPoints, initRouteList} = require('./utils')

async function getAll() {
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

async function getOne(id) {
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

module.exports = {
  getAll,
  getOne
}
