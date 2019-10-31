const mongoose = require('mongoose')

const Person = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'story'
  }],
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partner'
  }
})

module.exports = mongoose.model('person', Person)
