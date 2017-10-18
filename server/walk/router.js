const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const walkController = require('./controller')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyWalk = verifyPermission('walk')

router.post('/', [
  verifyAuthorization,
  verifyWalk('create'),
  walkController.walk
])

module.exports = router
