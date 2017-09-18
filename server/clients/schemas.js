const newClientSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true
    },
    key: {
      type: 'string',
      required: true
    },
    permissions: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        required: true,
        properties: {
          resource_id: {
            type: 'number',
            required: true
          },
          create: {
            type: 'boolean',
            required: true
          },
          read: {
            type: 'boolean',
            required: true
          },
          update: {
            type: 'boolean',
            required: true
          },
          delete: {
            type: 'boolean',
            required: true
          }
        }
      }
    }
  }
}

module.exports = {
  newClientSchema
}
