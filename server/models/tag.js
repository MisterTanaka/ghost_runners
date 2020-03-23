const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  color: {
    type: String,
    required: true,
    default: 'primary'
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  modified: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Tag', tagSchema);
