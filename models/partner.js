const mongoose = require('mongoose')

const Partner = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: String
})

module.exports = mongoose.model('partner', Partner)
