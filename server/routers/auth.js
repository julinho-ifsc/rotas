const express = require('express')
const {loginSchema} = require('../schemas/auth')
const {validateSchema} = require('../handlers/schemas')
const authController = require('../controllers/auth')

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/', [validateSchema(loginSchema), authController.login])

module.exports = router
