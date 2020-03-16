const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rowSchema = new mongoose.Schema({
  table: { type: Schema.Types.ObjectId, ref: 'Table' },
  rows: {
    type: [Object],
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modified: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Row', rowSchema);
