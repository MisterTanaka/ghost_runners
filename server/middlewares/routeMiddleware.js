const Table = require('../models/table');

module.exports = {
  getTable: async (req, res, next) => {
    try {
      table = await Table.findById(req.params.id);
      if (table == null) {
        return res.status(404).json({ message: 'Cant find table' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.table = table;
    next();
  },
};
