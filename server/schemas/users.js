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

module.exports = {
  newUserSchema
}
