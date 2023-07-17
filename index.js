'use strict';
require('dotenv').config();
const port = process.env.PORT || 3000;
const server = require('./src/server');
const { db } = require('./src/models/index.js');

(async () => {
  try {
    await db.sync({ force: true });
    server.start(port, () => {
      console.log(`server up on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
