const {sanitize} = require('../core/sanitize')

function handleSanitization(req, res, next) {
  req.body = sanitize(req.body)
  console.log(req.body)
  next()
}

module.exports = {
  handleSanitization
}
