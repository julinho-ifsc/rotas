const request = require('request')
const {NotFoundError, TranslationError} = require('../core/errors')
const RoutesService = require('../routes/service')

async function walk(req, res, next) {
  try {
    const routesService = new RoutesService(res.locals.databaseConnection)
    const {route: name} = req.body
    const route = await routesService.findByName(name)

    if (!route || Object.keys(route).length === 0) {
      throw new NotFoundError()
    }

    const options = {
      method: 'POST',
      uri: 'http://' + process.env.TRANSLATOR_HOST + ':3000/json',
      body: JSON.stringify(route)
    }

    request(options, err => {
      if (err) {
        throw new TranslationError()
      }
      res.json({
        message: 'Route sent with success!'
      })
    })
  } catch (err) {
    if (err.name === NotFoundError.name) {
      return res.status(404).json({
        message: 'Route not found'
      })
    }

    if (err.name === TranslationError.name) {
      return res.status(500).json({
        message: 'Not possible to translate route'
      })
    }

    next(err)
  }
}

module.exports = {
  walk
}
