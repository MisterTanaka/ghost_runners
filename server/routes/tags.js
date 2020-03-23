const express = require('express');
const _ = require('lodash');
const router = express.Router();
const Tag = require('../models/tag');
const { getTag } = require('../middlewares/routeMiddleware');
const {
  checkTagValidation,
  checkTagBulkValidation
} = require('../validation/tagValidation');

// A route to get all random table generate.
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// A route to get a random table
router.get('/:id', [
  getTag,
  (req, res) => {
    res.json(res.tag);
  }
]);

// A route to create a random table
router.post('/', async (req, res) => {
  const errors = checkTagValidation(req);
  const tag = new Tag({
    name: req.body.name,
    color: req.body.color
  });

  try {
    if (!errors.isEmpty()) {
      throw new Error(errors.array());
    }
    const newTag = await tag.save();
    res.status(201).json({
      tag: newTag,
      status: 201,
      message: 'The new tag have been generated with success!'
    });
  } catch (err) {
    res.status(400).json({ status: 500, message: err.message });
  }
});

router.post('/bulk', async (req, res) => {
  const errors = checkTagBulkValidation(req);
  let tags = [];

  try {
    if (!errors.isEmpty()) {
      throw new Error(errors.array());
    }

    console.log('tags', req.body.tags);

    let i = 0;
    await Tag.insertMany(req.body.tags).then(docs => {
      console.log('docs', docs);
      tags[i] = docs;
      i++;
    });
    res.status(201).json({
      tag: tags,
      status: 201,
      message: 'The new tag have been generated with success!'
    });
  } catch (err) {
    res.status(400).json({ status: 500, message: err.message });
  }
});

// A route to edit a random table
router.patch('/:id', [
  getTag,
  async (req, res) => {
    const errors = checkTagValidation(req);

    if (req.body.name != null) {
      res.tag.name = req.body.name;
    }

    if (req.body.color != null) {
      res.tag.color = req.body.color;
    }

    try {
      if (!errors.isEmpty()) {
        throw new Error(errors.array());
      }
      const updatedTag = await res.tag.save();
      res.json({
        status: 201,
        tag: updatedTag,
        message: 'The tag have been updated with success!'
      });
    } catch {
      res.status(400).json({ status: 500, message: err.message });
    }
  }
]);

// A route to delete a random table
router.delete('/:id', [
  getTag,
  async (req, res) => {
    try {
      await res.tag.remove();
      res.json({ message: 'Deleted This Tag' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
]);

module.exports = router;
