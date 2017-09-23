const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const {validateSchema} = require('../handlers/schemas')
const routesController = require('./controller')
const {newRouteSchema} = require('./schemas')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyRoutes = verifyPermission('routes')

router.get('/', [
  verifyAuthorization,
  verifyRoutes('read'),
  routesController.getAll
])

router.get('/:routeId', [
  verifyAuthorization,
  verifyRoutes('read'),
  routesController.getOne
])

router.post('/', [
  verifyAuthorization,
  verifyRoutes('create'),
  validateSchema(newRouteSchema),
  routesController.createRoute
])

router.put('/:routeId', [
  verifyAuthorization,
  verifyRoutes('update'),
  validateSchema(newRouteSchema),
  routesController.updateRoute
])

router.delete('/:routeId', [
  verifyAuthorization,
  verifyRoutes('delete'),
  routesController.deleteOne
])

module.exports = router
