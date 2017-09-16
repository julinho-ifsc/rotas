const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const clientsController = require('../controllers/clients')
const {newClientSchema} = require('../schemas/clients')
const {validateSchema} = require('../handlers/schemas')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyUsers = verifyPermission('clients')

// Router.get('/', [
//   verifyAuthorization,
//   verifyUsers('read'),
//   clientsController.getAll
// ])

// router.get('/:clientId', [
//   verifyAuthorization,
//   verifyUsers('read'),
//   clientsController.getOne
// ])

router.post('/', [
  verifyAuthorization,
  verifyUsers('create'),
  validateSchema(newClientSchema),
  clientsController.createClient
])

// Router.put('/:clientId', [
//   verifyAuthorization,
//   verifyUsers('update'),
//   clientsController.updateUser
// ])

// router.patch('/:clientId', [
//   verifyAuthorization,
//   verifyUsers('update'),
//   clientsController.updateUserField
// ])

// router.delete('/:clientId', [
//   verifyAuthorization,
//   verifyUsers('delete'),
//   clientsController.deleteUser
// ])

module.exports = router
