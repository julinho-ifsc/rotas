const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const {validateSchema} = require('../handlers/schemas')
const pointsController = require('./controller')
const {newPointSchema, patchPointSchema} = require('./schemas')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyPoints = verifyPermission('points')

router.get('/', [
  verifyAuthorization,
  verifyPoints('read'),
  pointsController.getAll
])

router.get('/:pointId', [
  verifyAuthorization,
  verifyPoints('read'),
  pointsController.getOne
])

router.post('/', [
  verifyAuthorization,
  verifyPoints('create'),
  validateSchema(newPointSchema),
  pointsController.createPoint
])

router.put('/:pointId', [
  verifyAuthorization,
  verifyPoints('update'),
  validateSchema(newPointSchema),
  pointsController.updatePoint
])

router.patch('/:pointId', [
  verifyAuthorization,
  verifyPoints('update'),
  validateSchema(patchPointSchema),
  pointsController.updatePointField
])

router.delete('/:pointId', [
  verifyAuthorization,
  verifyPoints('delete'),
  pointsController.deletePoint
])

module.exports = router
