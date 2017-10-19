const {MongoClient, ObjectID} = require('mongodb')

async function updateStatus(req, res, next) {
  try {
    const db = await MongoClient.connect('mongodb://mongo:27017')
    const collection = db.collection('status')

    await collection.insertOne(req.body)
    await db.close()
    res.json({
      message: 'Status updated with success'
    })
  } catch (err) {
    next(err)
  }
}

async function status(req, res, next) {
  try {
    const db = await MongoClient.connect('mongodb://mongo:27017')
    const collection = db.collection('status')

    const results = await collection
      .find({})
      .limit(100)
      .map(document => {
        const objectId = new ObjectID(document._id)

        return {
          time: objectId.getTimestamp(),
          topic: document.topic,
          status: document.status
        }
      })
      .toArray()

    await db.close()
    res.json(results)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  status,
  updateStatus
}
