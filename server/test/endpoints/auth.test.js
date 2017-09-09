const test = require('ava')
const request = require('supertest')
const isJWT = require('is-jwt')
const app = require('../../app')

test('get the auth token', async t => {
  const response = await request(app)
    .post('/users/auth')
    .send({email: 'admin@example.com', password: 'adminpassword123'})
    .set('Accept', 'application/json')

  t.is(response.status, 200)
  t.true(isJWT(response.body.token), 'it should respond a valid jwt')
})
