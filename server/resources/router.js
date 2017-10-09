const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const resourcesController = require('./controller')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyRoles = verifyPermission('resources')

router.get('/', [
  verifyAuthorization,
  verifyRoles('read'),
  resourcesController.list
])

module.exports = router
