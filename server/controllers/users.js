const usersService = require('../services/users')
const {InvalidUserError, NotFoundError} = require('../core/errors')

async function getAll(req, res) {
  try {
    return res.json(await usersService.getAll())
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function getOne(req, res) {
  try {
    const userId = req.params.userId

    if (isNaN(userId)) {
      throw new InvalidUserError()
    }

    const user = await usersService.getOne(Number(userId))

    if (!user) {
      throw new NotFoundError()
    }

    return res.json(user)
  } catch (err) {
    if (err.name === InvalidUserError.name) {
      return res.status(400).json({
        message: 'Invalid user id'
      })
    }

    if (err.name === NotFoundError.name) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function createUser(req, res) {
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

async function updateUser(req, res) {
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

async function updateUserField(req, res) {
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

async function deleteUser(req, res) {
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

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  updateUserField,
  deleteUser
}
