const mongoose = require('mongoose');

const setupDb = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on('error', error => console.error(error));
  db.once('open', () => console.log('connected to database'));
  return db;
};

module.exports = { setupDb };
