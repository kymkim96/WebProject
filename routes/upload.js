const express = require('express');
const router = express.Router();

const { Poster } = require('../models');
const { checkAdminPermission } = require('./middlewares');

router.post('/poster-act', checkAdminPermission, async (req, res, next) => {

})