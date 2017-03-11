'use strict';
const cheerio = require('cheerio');
const https = require('https');
const Promise = require('bluebird');
const request = require('request');
const elasticsearch = require('elasticsearch');

var app = require('./app');
var db = require('../db');

var port = 8080;
var server = app.listen(port, function (err) {
  if (err) throw err;
  console.log('HTTP server patiently listening on port', port);

  db.sync({force: false})
  .then(function () {
    console.log('Oh and btw the postgres server is totally connected, too');
  });
});

function nowISO() {
  var rightNow = new Date();
  var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
  return res;
}

//Set up elasticsearch. Create index. Index name will follow this format. ex. news-20170310
var client = new elasticsearch.Client({
  host: [
    {
      host: '0da27df61ca56b36757696681ab32d4f.us-east-1.aws.found.io',
      auth: 'elastic:Z9G09DPpGsFlNrsxlnedQG8r',
      protocol: 'https',
      port: 9243
    }
  ],
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
    throw new Error('Elasticsearch is not ready');
  } else {
    console.log('All is well');

    const indexName = `news-${nowISO()+'-3'}`;

    client.indices.create({
      index: indexName
    }, function(err, resp, status) {
      if (err) {
        console.log(`Creating Index(${indexName}) failed`, err);
      }
      else {
        console.log('resp', resp);
        elasticsearchReady(indexName);
      }
    });

  }
});

function elasticsearchReady(indexName) {

  console.log('starts making nyt api calls');

  let counter = 0;
  const i = setInterval(function() {
    console.log('inside setInterval', counter);
    request({

      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      method: 'GET',
      qs: {
        'api-key': "f9ba058d12394e05b9ccfeb91056ba50",
        'begin_date': "20170309",
        'page': counter
      }
    }, function(err, res, body) {
      if (err) {
        console.error('NYT REST API call failed.. body:', body, 'Error: ', err);
      } else {
        let jsonObj = null;
        try {
          jsonObj = JSON.parse(body);
        }
        catch (err) {
            console.error(`JSON.parse failed while parsing ${body}.`, 'Error: ', err);
        }
        if (jsonObj.response && jsonObj.response.docs.length > 0) {
          jsonObj.response.docs.forEach(doc => {
            console.log('snippet:', doc.snippet);

            client.index({
              index: indexName,
              type: 'article',
              body: {
                source: 'NYT',
                url: doc.web_url,
                snippet: doc.snippet,
                lead_paragraph: doc.lead_paragraph,
                headline: doc.headline.main,
                keywords: doc.keywords,

              }
            }, function(err,resp,status) {
              if (err) {
                console.error(`Error ocurred while indexing document: ${doc}`, 'Error:', err);
              } else {
                console.log(resp);
              }
            });


          })

        } else {
          console.warn('no more documents:', jsonObj);
        }
      }
    });

    counter++;
    if (counter > 120) {
        clearInterval(i);
    }
  }, 1100);


}



// console.log('number of promises:', promises.length);
// Promise.all(promises)
// .then(resonses => {
//   console.log('inside promise.all');
//   resonses.forEach(result => {
//     //console.log('response:', result[1]);

//     const jsonObj = JSON.parse(result[1]);
//     if (jsonObj.response) {
//       console.log('snippet:', jsonObj.response.docs[0].snippet);
//     } else {
//       console.warn('response obj does not exist:', jsonObj);
//     }
//   });
// });




// client.search({
//   index: 'twitter',
//   type: 'tweets',
//   body: {
//     query: {
//       match: {
//         body: 'elasticsearch'
//       }
//     }
//   }
// }).then(function (resp) {
//     var hits = resp.hits.hits;
// }, function (err) {
//     console.trace(err.message);
// });



module.exports = server;
