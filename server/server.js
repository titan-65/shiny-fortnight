// Both devBundle lines must be commented out during production.
import devBundle from "./devBundle"
import express from 'express'
import path from 'path'
import { MongoClient } from 'mongodb'



const app = express()
devBundle.compile(app)

const url = process.env.MONGODB_URI || 'mongodb+srv://newUser:Vantol@cluster0.sosjs.mongodb.net/god?retryWrites=true&w=majority'
MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully to mongodb server")
    db.close().then(r => r)
})

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

import template from './../template'
app.get('/', (req, res) => {
    res.status(200).send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})