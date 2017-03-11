'use strict';

var router = require('express').Router();
var request = require('request');

var HttpError = require('../utils/HttpError');
var Company = require('../../db/company');

router.get('/companies', function(req, res, next){
  Company.findAll()
  .then(companies => res.send(companies))
  .catch(next)
})

router.get('/', function (req, res, next) {

});

module.exports = router;
