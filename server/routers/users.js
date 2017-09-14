const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const usersController = require('../controllers/users')

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
  usersController.createUser
])

router.put('/:userID', [
  verifyAuthorization,
  verifyUsers('update'),
  usersController.updateUser
])

router.patch('/:userID', [
  verifyAuthorization,
  verifyUsers('update'),
  usersController.updateUserField
])

router.delete('/:userID', [
  verifyAuthorization,
  verifyUsers('delete'),
  usersController.deleteUser
])

module.exports = router
