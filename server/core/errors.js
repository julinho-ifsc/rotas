class UnauthorizedUserError extends Error {
  constructor() {
    super()
    this.name = 'UnauthorizedUserError'
  }
}

module.exports = {
  UnauthorizedUserError
}
