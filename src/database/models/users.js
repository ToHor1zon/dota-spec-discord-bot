const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    default: ''
  },
  discordId: {
    type: String,
    required: true,
    unique: false,
  },
  steamAccountId: {
    type: String,
    required: true,
    unique: true,
  },
  lastMatchId: {
    type: Number,
    default: null,
  },
})

module.exports = model('User', schema)