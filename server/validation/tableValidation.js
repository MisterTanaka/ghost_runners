const { check, validationResult } = require('express-validator');

const tableValidator = {
  checkTableValidation: req => {
    check('name').isLength({
      max: 100,
      min: 8,
    });
    check('description').notEmpty();
    check('columns').isLength({
      max: 16,
      min: 1,
    });
    return validationResult(req);
  },
};

module.exports = tableValidator;
