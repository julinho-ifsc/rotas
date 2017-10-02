const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const permissionsController = require('./controller')

// eslint-disable-next-line new-cap
const router = express.Router()

router.get('/', [verifyAuthorization, permissionsController.getAll])

module.exports = router
