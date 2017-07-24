const {validateUser, generateSecurePassword, verifySecurePassword} = require('./user-entity')

const basicUserInfo = {
  name: 'Willian',
  email: 'riker@enterprise.com',
  password: 'Str0ngP4ssw0rd$',
  cpf: '532.820.857-96'
}

describe('validateUser', () => {
  it('should validate the email', () => {
    const userInfo = Object.assign({}, basicUserInfo, {email: 'willian'})

    const expected = expect(() => {
      validateUser(userInfo)
    })

    expected.toThrow(Error)
    expected.toThrow('Invalid email')
  })

  it('should validate the cpf', () => {
    const userInfo = Object.assign({}, basicUserInfo, {cpf: '53282'})

    const expected = expect(() => {
      validateUser(userInfo)
    })

    expected.toThrow(Error)
    expected.toThrow('Invalid cpf')
  })

  it('should expect a formatted cpf', () => {
    const userInfo = Object.assign({}, basicUserInfo, {cpf: '53282085796'})

    const expected = expect(() => {
      validateUser(userInfo)
    })

    expected.toThrow(Error)
    expected.toThrow('Invalid cpf')
  })

  it('should accept only strong passwords', () => {
    const userInfo = Object.assign({}, basicUserInfo, {password: '123'})

    const expected = expect(() => {
      validateUser(userInfo)
    })

    expected.toThrow(Error)
    expected.toThrow(/The password must be at least 10 characters long./)
  })
})

describe('generateSecurePassword', () => {
  it('should return an object containing a function to create a password', async () => {
    const hash = await generateSecurePassword('hey')

    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })

  it('should throw an error', async () => {
    await expect(generateSecurePassword(new Error())).rejects.toEqual(new Error('Impossible to generate secure password'))
  })
})

describe('verifySecurePassword', () => {
  it('should return true if the password represents the hash', async () => {
    const password = 'hey'
    const hash = await generateSecurePassword(password)

    expect(await verifySecurePassword(password, hash)).toBe(true)
  })

  it('should return false', async () => {
    const password = 'hey'
    const hash = await generateSecurePassword(password)

    expect(await verifySecurePassword('there', hash)).toBe(false)
  })

  it('should return false', async () => {
    expect(await verifySecurePassword(new Error())).toBe(false)
  })
})
