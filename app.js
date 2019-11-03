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

const PORT = process.env.port || 3000
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
