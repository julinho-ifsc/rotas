const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const clientsController = require('../controllers/clients')
const {newClientSchema} = require('../schemas/clients')
const {validateSchema} = require('../handlers/schemas')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyClients = verifyPermission('clients')

router.get('/', [
  verifyAuthorization,
  verifyClients('read'),
  clientsController.getAll
])

// router.get('/:clientId', [
//   verifyAuthorization,
//   verifyClients('read'),
//   clientsController.getOne
// ])

router.post('/', [
  verifyAuthorization,
  verifyClients('create'),
  validateSchema(newClientSchema),
  clientsController.createClient
])

// Router.put('/:clientId', [
//   verifyAuthorization,
//   verifyClients('update'),
//   clientsController.updateUser
// ])

// router.patch('/:clientId', [
//   verifyAuthorization,
//   verifyClients('update'),
//   clientsController.updateUserField
// ])

// router.delete('/:clientId', [
//   verifyAuthorization,
//   verifyClients('delete'),
//   clientsController.deleteUser
// ])

module.exports = router
