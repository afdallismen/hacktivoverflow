require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

mongoose.connect(
  'mongodb://localhost:27017/hacktivoverflow',
  {
    useNewUrlParser: true
  }
)

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routes)

app.listen(3000, _ => {
  console.log('Listening on port 3000...')
})

module.exports = app
