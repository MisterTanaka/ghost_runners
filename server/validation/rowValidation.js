const { check, validationResult } = require('express-validator');

const rowValidator = {
  checkRowValidation: req => {
    check('table').isString();
    check('rows').notEmpty();
    check('rows').isLength({ min: 1 });
    return validationResult(req);
  },
};

module.exports = rowValidator;
