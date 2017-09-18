const express = require('express')
const {validateSchema} = require('../handlers/schemas')
const {loginSchema} = require('./schemas')
const authController = require('./controller')

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/', [validateSchema(loginSchema), authController.login])

module.exports = router
