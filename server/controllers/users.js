const express = require('express')
const {verifyAuthorization} = require('../handlers/auth')
const {verifyPermission} = require('../handlers/permissions')
const usersService = require('../services/users')

// eslint-disable-next-line new-cap
const router = express.Router()

const verifyUsers = verifyPermission('users')
console.log(verifyUsers)

router.get(
  '/',
  [verifyAuthorization, verifyUsers('read')],
  async (req, res) => {
    try {
      return res.json(await usersService.getAll())
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
)

router.get(
  '/:userID',
  [verifyAuthorization, verifyUsers('read')],
  async (req, res) => {
    try {
      return res.status(501).json({
        message: 'Not implemented'
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
)

router.post(
  '/',
  [verifyAuthorization, verifyUsers('create')],
  async (req, res) => {
    try {
      return res.status(501).json({
        message: 'Not implemented'
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
)

router.put(
  '/:userID',
  [verifyAuthorization, verifyUsers('update')],
  async (req, res) => {
    try {
      return res.status(501).json({
        message: 'Not implemented'
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
)

router.delete(
  '/:userID',
  [verifyAuthorization, verifyUsers('delete')],
  async (req, res) => {
    try {
      return res.status(501).json({
        message: 'Not implemented'
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
)

module.exports = router
