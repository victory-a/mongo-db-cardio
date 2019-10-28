const mongoose = require('mongoose')

const Story = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'person'
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

module.exports = mongoose.model('story', Story)
