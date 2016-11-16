const mongo = require('mongodb')
const most = require('most')

const url = 'mongodb://localhost:27017/myproject'

const insertDocuments = (db, callback) => {
  const collection = db.collection('documents')
  collection.insertMany([{a: 1}, {a: 2}, {a: 3}], (err, result) => {
    console.log('insert 3 documents into the document collection')
    callback(result)
  })
}

const updateDocument = (db, callback) => {
  const collection = db.collection('documents')
  collection.updateOne({a: 2}, {$set: {b: 1}}, (err, result) => {
    console.log('update the document with the field a equal to 2')
    callback(result)
  })
}

const deleteDocument = (db, callback) => {
  const collection = db.collection('documents')
  collection.deleteOne({a: 3}, (err, result) => {
    console.log('remove the document with the field a equal to 3')
    callback(result)
  })
}

const findDocuments = (db, callback) => {
  const collection = db.collection('documents')
  collection.find({}).toArray((err, docs) => {
    console.log('found the following records')
    // console.dir(docs)
    callback(docs)
  })
}

const db = new Promise((res, rej) => {
  mongo.connect(url, (err, db) => {
    if (err)  rej(err)
    else      res(db)
  })
})



// const db$ = most.fromPromise(db)
//   .map(db => {
//     insertDocuments(db, _ => db.close())
//   }).observe()



const insert = db => callback => {
  const collection = db.collection('documents')
  collection.insertMany([{a: 1}, {a: 2}, {a: 3}], (err, result) => {
    console.log('insert 3 documents into the document collection')
    callback(result)
  })
}

most.of(insert)
  .ap(most.fromPromise(db))
  .ap(most.of(console.log.bind(console)))
  .observe()

// db.then(db => {
//   console.log('connected.')
//
//   const insert = new Promise((res, rej) => {
//
//   })
//   // insertDocuments(db, _ => {
//   //   db.close()
//   // })
// })

// mongo.connect(url, (err, db) => {
//   console.log('connected.')
//
//   insertDocuments(db, _ => {
//     updateDocument(db, _ => {
//       deleteDocument(db, _ => {
//         findDocuments(db, _ => {
//           db.close()
//         })
//       })
//     })
//   })
// })