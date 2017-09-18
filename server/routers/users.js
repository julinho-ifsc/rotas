const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const {validateSchema} = require('../handlers/schemas')
const usersController = require('../controllers/users')
const {newUserSchema} = require('../schemas/users')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyUsers = verifyPermission('users')

router.get('/', [
  verifyAuthorization,
  verifyUsers('read'),
  usersController.getAll
])

router.get('/:userId', [
  verifyAuthorization,
  verifyUsers('read'),
  usersController.getOne
])

router.post('/', [
  verifyAuthorization,
  verifyUsers('create'),
  validateSchema(newUserSchema),
  usersController.createUser
])

router.put('/:userId', [
  verifyAuthorization,
  verifyUsers('update'),
  validateSchema(newUserSchema),
  usersController.updateUser
])

router.patch('/:userId', [
  verifyAuthorization,
  verifyUsers('update'),
  usersController.updateUserField
])

router.delete('/:userId', [
  verifyAuthorization,
  verifyUsers('delete'),
  usersController.deleteUser
])

module.exports = router
