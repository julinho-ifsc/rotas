async function seed(knex) {
  await knex('points').del()
  await knex('points').insert({name: 'biblioteca', rfid: '123456'})
}

module.exports = {
  seed
}
