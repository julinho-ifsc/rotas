// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
  console.error(err)
  res.status(500).json({
    message: 'Internal Server Error'
  })
}

module.exports = {
  handleError
}
