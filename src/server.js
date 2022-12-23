'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const authRouter = require('./routes/authRouter.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
const logger = require('./auth/middleware/logger');

// Prepare the express app
const app = express();



// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);
app.use('/api/v1', v1Routes); 
app.use('/api/v2', v2Routes);
app.use('*', notFound);

// Catchalls\
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
