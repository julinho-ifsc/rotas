const bcrypt = require('bcryptjs')

async function generateHash(password) {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

module.exports = {
  generateHash,
  verifyPassword
}
