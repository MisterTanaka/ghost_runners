const express = require('express');
const router = express.Router();
const Row = require('../models/row');
const { getTable, getRow } = require('../middlewares/routeMiddleware');
const { checkRowValidation } = require('../validation/rowValidation');
const mongoose = require('mongoose');
const _ = require('lodash');

// A route to get all random table generate.
router.get('/', async (req, res) => {
  try {
    const rows = await Row.find();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/tableId/:tableId', async (req, res) => {
  try {
    const rows = await Row.find({
      table: req.params.tableId
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// A route to get a random table
router.get('/:id', [
  getRow,
  (req, res) => {
    res.json(res.row);
  }
]);

// A route to create a random row in a table
router.post('/', async (req, res) => {
  const errors = checkRowValidation(req);
  let checkedRows = [];
  _.forEach(req.body.rows, (row, index) => {
    if (row.weigth < 0) {
      row.weigth = 0;
    }
    checkedRows[index] = row;
  });
  const row = new Row({
    table: mongoose.Types.ObjectId(req.body.tableId),
    rows: checkedRows
  });

  try {
    if (!errors.isEmpty()) {
      throw new Error(errors.array());
    }
    const newRow = await row.save();
    res.status(201).json({
      rows: newRow,
      status: 201,
      message: 'The new row have been generated with success!'
    });
  } catch (err) {
    res.status(400).json({ status: 500, message: err.message });
  }
});

router.patch('/:id', [
  getRow,
  async (req, res) => {
    const errors = checkRowValidation(req);

    let checkedRows = [];
    _.forEach(req.body.rows, (row, index) => {
      if (row.weigth < 0) {
        row.weigth = 0;
      }
      checkedRows[index] = row;
    });

    if (checkedRows != null) {
      res.row.rows = checkedRows;
    }

    try {
      if (!errors.isEmpty()) {
        throw new Error(errors.array());
      }
      const updatedRow = await res.row.save();
      res.json({
        status: 201,
        updatedRow,
        message: 'The rows have been updated with success!'
      });
    } catch {
      res.status(400).json({ status: 500, message: err.message });
    }
  }
]);

module.exports = router;
