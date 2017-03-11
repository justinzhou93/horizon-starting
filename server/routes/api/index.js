'use strict';
var router = require('express').Router();

router.use('/trend', require('./Trend'));
router.use('/company', require('./Company'));

module.exports = router;
