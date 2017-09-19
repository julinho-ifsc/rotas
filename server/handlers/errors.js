// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
  console.error(err)
  res.status(500).json({
    message: 'Internal Server Error'
  })
}

function handleNotFound(req, res) {
  res.status(404).json({
    message: 'Not found'
  })
}

module.exports = {
  handleError,
  handleNotFound
}
