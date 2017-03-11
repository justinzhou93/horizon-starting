'use strict';


var router = require('express').Router();

router.use('/model', require('./Model'));
router.use('/articles', require('./articles'));

module.exports = router;
