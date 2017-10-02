const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const {validateSchema} = require('../handlers/schemas')
const clientsController = require('./controller')
const {newClientSchema} = require('./schemas')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyClients = verifyPermission('clients')

router.post('/', [
  verifyAuthorization,
  verifyClients('create'),
  validateSchema(newClientSchema),
  clientsController.createClient
])

module.exports = router
