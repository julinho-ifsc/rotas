const RolesRepository = require('./repository')

async function list(req, res, next) {
  try {
    const roleRepository = new RolesRepository(res.locals.databaseConnection)

    return res.json(await roleRepository.list())
  } catch (err) {
    next(err)
  }
}

module.exports = {
  list
}
