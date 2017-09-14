class UnauthorizedUserError extends Error {
  constructor() {
    super()
    this.name = 'UnauthorizedUserError'
  }
}

class AuthorizationTypeError extends Error {
  constructor() {
    super()
    this.name = 'AuthorizationTypeError'
  }
}

class InvalidUserError extends Error {
  constructor() {
    super()
    this.name = 'InvalidUserError'
  }
}

class NotFoundError extends Error {
  constructor() {
    super()
    this.name = 'NotFoundError'
  }
}

module.exports = {
  UnauthorizedUserError,
  AuthorizationTypeError,
  InvalidUserError,
  NotFoundError
}
