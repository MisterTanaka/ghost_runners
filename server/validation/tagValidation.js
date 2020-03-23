const { check, validationResult } = require('express-validator');

const tagValidator = {
  checkTagValidation: req => {
    check('name')
      .isString()
      .notEmpty();
    check('color')
      .isString()
      .notEmpty();
    return validationResult(req);
  },
  checkTagBulkValidation: req => {
    check('tags.*.name').notEmpty();
    check('tags.*.color')
      .isString()
      .notEmpty();
    return validationResult(req);
  }
};

module.exports = tagValidator;
