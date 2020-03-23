const Table = require('../models/table');
const Row = require('../models/row');
const Tag = require('../models/tag');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = {
  getTable: async (req, res, next) => {
    try {
      const table = await Table.findById(req.params.id);
      await table.populate({
        path: 'categories',
        populate: {
          path: 'categories',
          model: 'Tag'
        }
      });

      if (table == null) {
        return res.status(404).json({ message: 'Cant find table' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.table = table;
    next();
  },

  getRow: async (req, res, next) => {
    try {
      row = await Row.findById(req.params.id);
      if (row == null) {
        return res.status(404).json({ message: 'Cant find row' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.row = row;
    next();
  },

  getTag: async (req, res, next) => {
    try {
      tag = await Tag.findById(req.params.id);
      if (tag == null) {
        return res.status(404).json({ message: 'Cant find row' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.tag = tag;
    next();
  }
};
