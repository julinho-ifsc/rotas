const validate = require('jsonschema').validate

const validateSchema = schema => (req, res, next) => {
  const isValid = validate(req.body, schema).valid
  if (isValid === false) {
    return res.status(400).json({
      message: 'Invalid schema'
    })
  }

  if (
    schema.type === 'object' &&
    !Object.keys(req.body).every(key =>
      Object.keys(schema.properties).includes(key)
    )
  ) {
    return res.status(400).json({
      message: 'Invalid schema'
    })
  }

  next()
}

module.exports = {
  validateSchema
}
