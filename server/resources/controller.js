const ResourcesRepository = require('./repository')

async function list(req, res, next) {
  try {
    const resourcesRepository = new ResourcesRepository(
      res.locals.databaseConnection
    )

    return res.json(await resourcesRepository.list())
  } catch (err) {
    next(err)
  }
}

module.exports = {
  list
}
