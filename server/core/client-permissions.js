function reducePermissions(accumulator, currentValue, currentIndex) {
  accumulator[currentValue.resource_id] = {
    create: currentValue.create,
    read: currentValue.read,
    update: currentValue.update,
    delete: currentValue.delete
  }
  return accumulator
}

function clientHasValidPermissions(
  resourceOwnerPermissions,
  clientPermissions
) {
  const resourceOwnerReduced = resourceOwnerPermissions.reduce(
    reducePermissions,
    {}
  )
  const clientReduced = clientPermissions.reduce(reducePermissions, {})
  const resourceOwnerResources = Object.keys(resourceOwnerReduced)
  const clientResources = Object.keys(clientReduced)

  if (
    !clientResources.every(resource =>
      resourceOwnerResources.includes(resource)
    )
  ) {
    return false
  }

  return resourceOwnerResources.every(index => {
    const resourceOwnerPermission = resourceOwnerReduced[index]
    const clientPermission = clientReduced[index]

    return Object.keys(resourceOwnerPermission).every(key => {
      if (
        !resourceOwnerPermission[key] &&
        clientPermission[key] !== false
      ) {
        return false
      }
      return true
    })
  })
}

module.exports = {
  clientHasValidPermissions
}
