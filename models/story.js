const mongoose = require('mongoose')

module.exports = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'person',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  fans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'person'
  }]
})
