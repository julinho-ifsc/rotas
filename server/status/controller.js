const {MongoClient, ObjectID} = require('mongodb')

const url = 'mongodb://' + process.env.MONGO_HOST + ':27017'

async function updateStatus(req, res, next) {
  try {
    const db = await MongoClient.connect(url)
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
    const db = await MongoClient.connect(url)
    const collection = db.collection('status')

    const results = await collection
      .find({})
      .sort({_id: -1})
      .limit(100)
      .map(document => {
        const objectId = new ObjectID(document._id)

        return {
          time: objectId.getTimestamp(),
          topic: document.topic,
          status: document.status,
          robot: document.robot || 'julinho'
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
