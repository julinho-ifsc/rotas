const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
// Const {validateSchema} = require('../handlers/schemas')
const routesController = require('./controller')
// Const {newPointSchema, patchPointSchema} = require('./schemas')

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

// Router.post('/', [
//   verifyAuthorization,
//   verifyRoutes('create'),
//   validateSchema(newPointSchema),
//   routesController.createRoute
// ])

// router.put('/:routeId', [
//   verifyAuthorization,
//   verifyRoutes('update'),
//   validateSchema(newPointSchema),
//   routesController.updateRoute
// ])

// router.patch('/:routeId', [
//   verifyAuthorization,
//   verifyRoutes('update'),
//   validateSchema(patchPointSchema),
//   routesController.updateRouteField
// ])

router.delete('/:routeId', [
  verifyAuthorization,
  verifyRoutes('delete'),
  routesController.deleteOne
])

module.exports = router
