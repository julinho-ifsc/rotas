const {InvalidPointError, NotFoundError} = require('../core/errors')
const pointsRepository = require('./repository')

async function getAll(req, res, next) {
  try {
    return res.json(await pointsRepository.getAll())
  } catch (err) {
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const pointId = req.params.pointId

    if (isNaN(pointId)) {
      throw new InvalidPointError()
    }

    const point = await pointsRepository.getOne(Number(pointId))

    if (!point) {
      throw new NotFoundError()
    }

    return res.json(point)
  } catch (err) {
    if (err.name === InvalidPointError.name) {
      return res.status(400).json({
        message: 'Invalid point id'
      })
    }

    if (err.name === NotFoundError.name) {
      return res.status(404).json({
        message: 'Point not found'
      })
    }

    next(err)
  }
}

async function createPoint(req, res, next) {
  try {
    const {rfid, name} = req.body
    const [pointId] = await pointsRepository.createPoint(rfid, name)

    return res.json({
      id: pointId,
      rfid,
      name
    })
  } catch (err) {
    next(err)
  }
}

async function deletePoint(req, res, next) {
  try {
    const pointId = req.params.pointId

    if (isNaN(pointId)) {
      throw new InvalidPointError()
    }

    await pointsRepository.deletePoint(pointId)
    return res.status(204).send()
  } catch (err) {
    if (err.name === InvalidPointError.name) {
      return res.status(400).json({
        message: 'Invalid point id'
      })
    }

    next(err)
  }
}

async function updatePoint(req, res, next) {
  try {
    const pointId = req.params.pointId

    if (isNaN(pointId)) {
      throw new InvalidPointError()
    }

    const {rfid, name} = req.body
    await pointsRepository.updatePoint(Number(pointId), {
      rfid,
      name
    })
    return res.status(200).json({
      id: pointId,
      rfid,
      name
    })
  } catch (err) {
    if (err.name === InvalidPointError.name) {
      return res.status(400).json({
        message: 'Invalid point id'
      })
    }

    next(err)
  }
}

async function updatePointField(req, res, next) {
  try {
    const pointId = req.params.pointId

    if (isNaN(pointId)) {
      throw new InvalidPointError()
    }

    await pointsRepository.updatePoint(Number(pointId), req.body)
    const point = await pointsRepository.getOne(Number(pointId))

    if (!point) {
      throw new NotFoundError()
    }

    return res.json(point)
  } catch (err) {
    if (err.name === InvalidPointError.name) {
      return res.status(400).json({
        message: 'Invalid point id'
      })
    }

    if (err.name === NotFoundError.name) {
      return res.status(404).json({
        message: 'Point not found'
      })
    }

    next(err)
  }
}

module.exports = {
  getAll,
  getOne,
  createPoint,
  deletePoint,
  updatePoint,
  updatePointField
}
