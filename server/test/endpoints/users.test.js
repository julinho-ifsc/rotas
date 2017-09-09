const test = require('ava')
const request = require('supertest')
const app = require('../../app')

test('get the users without authentication', async t => {
  const response = await request(app)
    .get('/users')
    .set('Accept', 'application/json')

  t.is(response.status, 401, 'it should be unauthorized')
})
