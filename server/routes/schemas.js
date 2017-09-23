const newRouteSchema = {
  type: 'object',
  required: true,
  properties: {
    name: {
      type: 'string',
      required: true
    },
    points: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        properties: {
          point: {
            type: 'number',
            required: true
          },
          action: {
            type: 'string',
            required: true,
            maxLength: 1
          }
        }
      }
    }
  }
}

const patchRouteSchema = {
  type: 'object',
  required: true,
  properties: {
    points: {
      type: 'array',
      required: false,
      items: {
        type: 'object',
        properties: {
          point: {
            type: 'number',
            required: true
          },
          action: {
            type: 'string',
            required: true,
            maxLength: 1
          }
        }
      }
    },
    name: {
      type: 'string',
      required: false
    }
  }
}

module.exports = {
  newRouteSchema,
  patchRouteSchema
}
