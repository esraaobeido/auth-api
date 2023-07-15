'use strict';
require('dotenv').config();
const port = process.env.PORT || 3000;
const server = require('./src/server');
const { db } = require('./src/models/index.js');


db.sync({force:true})
    .then(() => {
        server.start(port, () => {
            console.log(`server up on port ${port}`);
        })
    })