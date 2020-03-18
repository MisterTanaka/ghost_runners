const express = require('express');
const router = express.Router();
const Row = require('../models/row');
const { getTable, getRow } = require('../middlewares/routeMiddleware');
const { checkRowValidation } = require('../validation/rowValidation');
const mongoose = require('mongoose');

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
      table: req.params.tableId,
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
  },
]);

// A route to create a random table
router.post('/', async (req, res) => {
  const errors = checkRowValidation(req);
  const row = new Row({
    table: mongoose.Types.ObjectId(req.body.tableId),
    rows: req.body.rows,
  });

  try {
    if (!errors.isEmpty()) {
      throw new Error(errors.array());
    }
    const newRow = await row.save();
    res.status(201).json({
      rows: newRow,
      status: 200,
      message: 'The new row have been generated with success!',
    });
  } catch (err) {
    res.status(400).json({ status: 500, message: err.message });
  }
});

router.patch('/:id', [
  getRow,
  async (req, res) => {
    const errors = checkRowValidation(req);

    if (req.body.rows != null) {
      res.row.rows = req.body.rows;
    }

    try {
      if (!errors.isEmpty()) {
        throw new Error(errors.array());
      }
      const updatedRow = await res.row.save();
      res.json({
        status: 200,
        updatedRow,
        message: 'The rows have been updated with success!',
      });
    } catch {
      res.status(400).json({ status: 500, message: err.message });
    }
  },
]);

module.exports = router;
