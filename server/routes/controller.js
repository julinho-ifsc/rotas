const {InvalidRouteError, NotFoundError} = require('../core/errors')
const RoutesService = require('./service')
const routesRepository = require('./repository')

async function getAll(req, res, next) {
  try {
    const routesService = new RoutesService(res.locals.databaseConnection)
    return res.json(await routesService.getAll())
  } catch (err) {
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const routeId = req.params.routeId

    if (isNaN(routeId)) {
      throw new InvalidRouteError()
    }

    const routesService = new RoutesService(res.locals.databaseConnection)
    const route = await routesService.getOne(Number(routeId))

    if (!route) {
      throw new NotFoundError()
    }

    return res.json(route)
  } catch (err) {
    if (err.name === InvalidRouteError.name) {
      return res.status(400).json({
        message: 'Invalid route id'
      })
    }

    if (err.name === NotFoundError.name) {
      return res.status(404).json({
        message: 'Route not found'
      })
    }

    next(err)
  }
}

async function deleteOne(req, res, next) {
  try {
    const routeId = req.params.routeId

    if (isNaN(routeId)) {
      throw new InvalidRouteError()
    }

    await routesRepository.deleteOne(Number(routeId))

    return res.status(200).json({
      message: `Route ${routeId} deleted with success`
    })
  } catch (err) {
    if (err.name === InvalidRouteError.name) {
      return res.status(400).json({
        message: 'Invalid route id'
      })
    }

    next(err)
  }
}

async function createRoute(req, res, next) {
  try {
    const {name, points} = req.body

    const routesService = new RoutesService(res.locals.databaseConnection)
    const route = await routesService.createRoute({name, points})
    return res.status(201).json(route)
  } catch (err) {
    next(err)
  }
}

async function updateRoute(req, res, next) {
  try {
    const routeId = req.params.routeId

    if (isNaN(routeId)) {
      throw new InvalidRouteError()
    }

    const {name, points} = req.body

    const routesService = new RoutesService(res.locals.databaseConnection)
    const route = await routesService.updateRoute(Number(routeId), {
      name,
      points
    })
    return res.json(route)
  } catch (err) {
    if (err.name === InvalidRouteError.name) {
      return res.status(400).json({
        message: 'Invalid route id'
      })
    }

    next(err)
  }
}

module.exports = {
  getAll,
  getOne,
  deleteOne,
  createRoute,
  updateRoute
}
