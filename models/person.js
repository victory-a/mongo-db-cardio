const mongoose = require('mongoose')

module.exports = mongoose.Schema({
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
