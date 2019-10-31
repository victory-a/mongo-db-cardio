const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

// routes
const personRoute = require('./routes/person')
const storyRoute = require('./routes/story')
const partnerRoute = require('./routes/partner')

// middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/person', personRoute)
app.use('/story', storyRoute)
app.use('/partner', partnerRoute)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}
mongoose.createConnection('mongodb://localhost/populate', options)
  .catch(error => { return { error } })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('db successfully connected'))

const PORT = process.env.port || 3000
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
