const {sanitize} = require('../core/sanitize')

function handleSanitization(req, res, next) {
  req.body = sanitize(req.body)
  next()
}

module.exports = {
  handleSanitization
}
