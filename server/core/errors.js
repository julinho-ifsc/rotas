class UnauthorizedUserError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'UnauthorizedUserError'
  }
}

class AuthorizationTypeError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'AuthorizationTypeError'
  }
}

class InvalidUserError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'InvalidUserError'
  }
}

class NotFoundError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'NotFoundError'
  }
}

class InvalidClientPermissionsError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'InvalidClientPermissionsError'
  }
}

class InvalidPointError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'InvalidPointError'
  }
}

class InvalidRouteError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'InvalidRouteError'
  }
}

class InvalidClientError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'InvalidClientError'
  }
}

class TranslationError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'TranslationError'
  }
}

module.exports = {
  UnauthorizedUserError,
  AuthorizationTypeError,
  InvalidUserError,
  NotFoundError,
  InvalidClientPermissionsError,
  InvalidPointError,
  InvalidRouteError,
  InvalidClientError,
  TranslationError
}
