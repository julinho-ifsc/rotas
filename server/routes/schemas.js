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
        type: 'number'
      }
    }
  }
}

const patchRouteSchema = {
  type: 'object',
  required: true,
  properties: {
    rfid: {
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
  newRouteSchema,
  patchRouteSchema
}
