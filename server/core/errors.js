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

class InvalidClientPermissionsError extends Error {
  constructor() {
    super()
    this.name = 'InvalidClientPermissionsError'
  }
}

class InvalidPointError extends Error {
  constructor() {
    super()
    this.name = 'InvalidPointError'
  }
}

class InvalidRouteError extends Error {
  constructor() {
    super()
    this.name = 'InvalidRouteError'
  }
}

module.exports = {
  UnauthorizedUserError,
  AuthorizationTypeError,
  InvalidUserError,
  NotFoundError,
  InvalidClientPermissionsError,
  InvalidPointError,
  InvalidRouteError
}
