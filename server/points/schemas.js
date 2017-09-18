const newPointSchema = {
  type: 'object',
  required: true,
  properties: {
    rfid: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    }
  }
}

const patchPointSchema = {
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
  newPointSchema,
  patchPointSchema
}
