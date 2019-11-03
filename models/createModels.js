const mongoose = require('mongoose')
const personSchema = require('./person')
const partnerSchema = require('./partner')
const storySchema = require('./story')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const DB1 = mongoose.createConnection('mongodb://localhost/populate', options)
const DB2 = mongoose.createConnection('mongodb://localhost/partner', options)
const dbs = [DB1, DB2]
dbs.map((db) => {
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => console.log('db successfully connected'))
})

const Person = DB1.model('person', personSchema)
const Story = DB1.model('story', storySchema)
const Partner = DB2.model('partner', partnerSchema)

module.exports = { Story, Person, Partner }
