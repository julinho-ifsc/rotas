const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const rolesController = require('./controller')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyRoles = verifyPermission('roles')

router.get('/', [
  verifyAuthorization,
  verifyRoles('read'),
  rolesController.list
])

module.exports = router
