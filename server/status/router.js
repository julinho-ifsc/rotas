const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const statusController = require('./controller')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyStatus = verifyPermission('status')

router.post('/', [
  verifyAuthorization,
  verifyStatus('create'),
  statusController.updateStatus
])

router.get('/', [
  verifyAuthorization,
  verifyStatus('read'),
  statusController.status
])

module.exports = router
