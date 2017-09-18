const newUserSchema = {
  type: 'object',
  properties: {
    role_id: {
      type: 'number',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    }
  }
}

const patchUserSchema = {
  type: 'object',
  properties: {
    role_id: {
      type: 'number',
      required: false
    },
    password: {
      type: 'string',
      required: false
    },
    email: {
      type: 'string',
      required: false
    },
    name: {
      type: 'string',
      required: false
    }
  }
}

module.exports = {
  newUserSchema,
  patchUserSchema
}
