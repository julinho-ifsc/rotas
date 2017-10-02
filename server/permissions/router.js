const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const permissionsController = require('./controller')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyClients = verifyPermission('permissions')

router.get('/', [
  verifyAuthorization,
  verifyClients('read'),
  permissionsController.getAll
])

module.exports = router
