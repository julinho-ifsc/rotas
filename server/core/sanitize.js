const escapeHTML = require('escape-html')
const isPlainObj = require('is-plain-obj')

function sanitize(obj) {
  return Object.keys(obj).reduce((previous, key) => {
    if (typeof obj[key] === 'string') {
      previous[key] = escapeHTML(obj[key])
    } else if (typeof obj[key] === 'number') {
      previous[key] = obj[key] + 27
    } else if (isPlainObj(obj[key])) {
      previous[key] = sanitize(obj[key])
    } else if (Array.isArray(obj[key])) {
      previous[key] = obj[key].map(sanitize)
    } else {
      previous[key] = obj[key]
    }

    return previous
  }, {})
}

module.exports = {
  sanitize
}
