'use strict';

var router = require('express').Router();
const elasticsearch = require('elasticsearch');
const info = require('../../../secret.config');

//var HttpError = require('../utils/HttpError');

function nowISO() {
  var rightNow = new Date();
  var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
  return res;
}

router.get('/', (req, res, next) => {

  var client = new elasticsearch.Client({
    host: [
      {
        host: info.elasticsearch.host,
        auth: `${info.elasticsearch.username}:${info.elasticsearch.password}`,
        protocol: info.elasticsearch.protocol,
        port: info.elasticsearch.port
      }
    ],
    log: 'trace'
  });

  client.search({
    index: `trends-${'201703111'}`,
    size: 5,
  }).then(function (resp) {
      if (resp) {
        res.json(resp);
      }
  }, function (err) {
      console.trace(err.message);
  });

});

router.get('/words', (req, res, next) => {

  res.send({
    success: true,
  })

});



module.exports = router;
