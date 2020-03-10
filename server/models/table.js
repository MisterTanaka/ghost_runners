const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  themes: {
    type: String,
    required: true,
    default: 'default',
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  columns: [
    {
      column_name: { type: String, required: true },
      column_type: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: false,
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

module.exports = mongoose.model('Table', tableSchema);
