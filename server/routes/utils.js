const getPoint = route => ({
  rfid: route.rfid,
  id: route.point,
  name: route.pointName,
  index: route.position
})

const sortPoints = points =>
  points
    .sort((a, b) => a.index - b.index)
    .map(({id, name, rfid}) => ({id, name, rfid}))

const initRouteList = route => ({
  id: route.id,
  name: route.name,
  points: [getPoint(route)]
})

module.exports = {
  getPoint,
  sortPoints,
  initRouteList
}
