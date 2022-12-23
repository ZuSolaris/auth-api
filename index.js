'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models');
console.log(db);
const { server, start } = require('./src/server');
console.log(server);
const PORT = process.env.PORT;

db.sync().then(() => {
  console.log('connected to', PORT);
start(PORT);
});

