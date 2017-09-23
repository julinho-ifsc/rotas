const getPoint = route => ({
  rfid: route.rfid,
  id: route.point,
  name: route.pointName,
  index: route.position,
  action: route.action
})

const sortPoints = points =>
  points
    .sort((a, b) => a.index - b.index)
    .map(({id, name, rfid, action}) => ({id, name, rfid, action}))

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
