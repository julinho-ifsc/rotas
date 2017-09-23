async function seed(knex) {
  await knex('routes_point').del()
  await knex('routes').del()
  await knex('points').del()
  await knex('points').insert({name: 'library', rfid: '123456'})
  await knex('points').insert({name: 'classroom', rfid: '123456789'})
  const {id: libraryId} = await knex('points')
    .first('id')
    .where('name', 'library')
  const {id: classroomId} = await knex('points')
    .first('id')
    .where('name', 'classroom')
  const [firstRouteId] = await knex('routes')
    .returning('id')
    .insert({name: 'firstRoute'})

  const [secondRouteId] = await knex('routes')
    .returning('id')
    .insert({name: 'secondRoute'})

  await knex('routes_point').insert({
    route_id: firstRouteId,
    point_id: classroomId,
    position: 0,
    action: 'd'
  })

  await knex('routes_point').insert({
    route_id: firstRouteId,
    point_id: libraryId,
    position: 1,
    action: 'e'
  })

  await knex('routes_point').insert({
    route_id: secondRouteId,
    point_id: classroomId,
    position: 1,
    action: 'p'
  })

  await knex('routes_point').insert({
    route_id: secondRouteId,
    point_id: libraryId,
    position: 0,
    action: 'f'
  })
}

module.exports = {
  seed
}
