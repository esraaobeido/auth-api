'use strict';

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../auth/middleware/bearer');
const permission= require('../auth/middleware/acl')
const acl = require('../auth/middleware/acl');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/api/v2', bearerAuth, v2Handler);
router.post('/api/v2', bearerAuth, acl('create'),v2CreateHandler);
router.put('/api/v2', bearerAuth, acl('update'),v2UpdateHander);
router.delete('/api/v2', bearerAuth, acl('delete'), v2DeleteHandler);


function v2Handler(req, res) {
    res.status(200).json('you have the access');
}

function v2CreateHandler(req, res) {
    res.status(201).json('you can Create');
}

function v2UpdateHander(req, res) {
    res.status(200).json('you can update');
}

function v2DeleteHandler(req, res) {
    res.status(200).json('you can delete');
}


module.exports = router;