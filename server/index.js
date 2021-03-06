require('dotenv').config();
const express = require('express');
const consola = require('consola');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setupDb } = require('./api/db');
const { Nuxt, Builder } = require('nuxt');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  //connection to db
  const db = setupDb();

  // adding dependencies
  const tableRoutes = require('./routes/tables');
  app.use('/api/tables', tableRoutes);

  const rowRoutes = require('./routes/rows');
  app.use('/api/rows', rowRoutes);

  const tagRoutes = require('./routes/tags');
  app.use('/api/tags', tagRoutes);

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
