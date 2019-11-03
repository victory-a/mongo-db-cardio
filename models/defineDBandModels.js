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

const testConnection = (db, alias) => {
  db.on('error', console.error.bind(console, `${alias} connection error: `))
  db.once('open', () => console.log(`${alias} successfully connected`))
}

testConnection(DB1, 'DB1')
testConnection(DB2, 'DB2')

const Person = DB1.model('person', personSchema)
const Story = DB1.model('story', storySchema)
const Partner = DB2.model('partner', partnerSchema)

module.exports = { Story, Person, Partner }
