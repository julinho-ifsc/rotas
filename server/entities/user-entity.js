const {promisify} = require('util')
const isemail = require('isemail')
const owasp = require('owasp-password-strength-test')
const {CPF} = require('cpf_cnpj')
const securePassword = require('secure-password')

const pwd = securePassword()
pwd.hash = promisify(pwd.hash)
pwd.verify = promisify(pwd.verify)

exports.validateUser = function({name, email, password, cpf}) {
  const passwordTest = owasp.test(password)

  if (passwordTest.strong === false) {
    throw new Error(passwordTest.errors[0])
  }

  if (!isemail.validate(email)) {
    throw new Error('Invalid email')
  }

  if (!CPF.isValid(cpf, true) || CPF.format(cpf) !== cpf) {
    throw new Error('Invalid cpf')
  }
}

exports.generateSecurePassword = async function(password) {
  try {
    const userPassword = Buffer.from(password)
    const hash = await pwd.hash(userPassword)
    return hash.toString('utf8')
  } catch(err) {
    throw new Error('Impossible to generate secure password')
  }
}

exports.verifySecurePassword = async function(password, hash) {
  try {
    const userPassword = Buffer.from(password)
    const result = await pwd.verify(userPassword, Buffer.from(hash))

    if (result === securePassword.INVALID) {
      return false
    }
  } catch(err) {
    return false
  }

  return true
}

