const express = require('express');
const router = express.Router();
const Table = require('../models/table');
const { getTable } = require('../middlewares/routeMiddleware');
const { checkTableValidation } = require('../validation/tableValidation');

// A route to get all random table generate.
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// A route to get a random table
router.get('/:id', [
  getTable,
  (req, res) => {
    res.json(res.table);
  }
]);

// A route to create a random table
router.post('/', async (req, res) => {
  const errors = checkTableValidation(req);
  let columns = req.body.columns;
  columns.unshift({
    column_key: 'weigth',
    column_name: 'Weigth',
    column_type: 'number'
  });
  const table = new Table({
    name: req.body.name,
    description: req.body.description,
    columns: columns
  });

  try {
    if (!errors.isEmpty()) {
      throw new Error(errors.array());
    }
    const newTable = await table.save();
    res.status(201).json({
      table: newTable,
      status: 200,
      message: 'The new table have been generated with success!'
    });
  } catch (err) {
    res.status(400).json({ status: 500, message: err.message });
  }
});

// A route to edit a random table
router.patch('/:id', [
  getTable,
  async (req, res) => {
    const errors = checkTableValidation(req);

    if (req.body.name != null) {
      res.table.name = req.body.name;
    }

    if (req.body.description != null) {
      res.table.description = req.body.description;
    }

    if (req.body.columns != null) {
      res.table.columns = req.body.columns;
    }
    try {
      if (!errors.isEmpty()) {
        throw new Error(errors.array());
      }
      const updatedTable = await res.table.save();
      res.json({
        status: 200,
        updatedTable,
        message: 'The table have been updated with success!'
      });
    } catch {
      res.status(400).json({ status: 500, message: err.message });
    }
  }
]);

// A route to delete a random table
router.delete('/:id', [
  getTable,
  async (req, res) => {
    try {
      await res.table.remove();
      res.json({ message: 'Deleted This Table' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
]);

module.exports = router;
