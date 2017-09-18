const {InvalidUserError, NotFoundError} = require('../core/errors')
const usersService = require('./service')

async function getAll(req, res, next) {
  try {
    return res.json(await usersService.getAll())
  } catch (err) {
    next(err)
  }
}

async function getOne(req, res, next) {
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

    next(err)
  }
}

async function createUser(req, res, next) {
  try {
    const {role_id, password, email, name} = req.body
    const [userId] = await usersService.createUser({
      role: role_id,
      password,
      email,
      name
    })
    return res.status(201).json({
      id: userId,
      name,
      role_id,
      email
    })
  } catch (err) {
    next(err)
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.params.userId

    if (isNaN(userId)) {
      throw new InvalidUserError()
    }

    const {role_id, password, email, name} = req.body
    await usersService.updateUser(Number(userId), {
      role_id,
      password,
      email,
      name
    })
    return res.status(200).json({
      id: userId,
      role_id,
      email,
      name
    })
  } catch (err) {
    if (err.name === InvalidUserError.name) {
      return res.status(400).json({
        message: 'Invalid user id'
      })
    }

    next(err)
  }
}

async function updateUserField(req, res, next) {
  try {
    const userId = req.params.userId

    if (isNaN(userId)) {
      throw new InvalidUserError()
    }

    await usersService.updateUserField(Number(userId), req.body)
    const user = await usersService.getOne(Number(userId))

    if (!user) {
      throw new NotFoundError()
    }

    return res.status(200).json(user)
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

    next(err)
  }
}

async function deleteUser(req, res, next) {
  try {
    const userId = req.params.userId

    if (isNaN(userId)) {
      throw new InvalidUserError()
    }

    await usersService.deleteUser(Number(userId))

    return res.status(204).send()
  } catch (err) {
    if (err.name === InvalidUserError.name) {
      return res.status(400).json({
        message: 'Invalid user id'
      })
    }

    next(err)
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
