'use strict';
// const cheerio = require('cheerio');
// const https = require('https');
const Promise = require('bluebird');
// const request = require('request');
const pRequest = require('request-promise');
const elasticsearch = require('elasticsearch');

var app = require('./routes/app');
var db = require('./db');
var info = require('../secret.config');

var port = 8080;
var server = app.listen(port, function (err) {
  if (err) throw err;
  console.log('HTTP server patiently listening on port', port);

  db.sync({force: false})
  .then(function () {
    console.log('Oh and btw the postgres server is totally connected, too');
    configureElastic();
  });
});

function nowISO() {
  var rightNow = new Date();
  var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
  return res;
}

function configureElastic() {
  //Set up elasticsearch. Create index. Index name will follow this format. ex. news-20170310
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

  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
      throw new Error('Elasticsearch is not ready');
    } else {
      console.log('All is well');

      const indexName = `news-${nowISO() + '-2'}`;

      client.indices.create({
        index: indexName
      }, function(err, resp, status) {
        if (err) {
          console.log(`Creating Index(${indexName}) failed`, err);
          elasticsearchReady(client, indexName);
          //companyRanks(indexName); //remove later
        }
        else {
          console.log('resp', resp);
          elasticsearchReady(client, indexName);
          // companyRanks(indexName); //remove later
        }
      });

    }
  });

}

function elasticsearchReady(client, indexName) {

  console.log('starts making nyt api calls');
  const topFive = [];
  topFive.minCount = 0;

  db.model('company').findAll()
  .then(companies => {

    let topFive = [];

    let incrementalTimer = 0;
    const promises = companies.map(company => {
      //var counter = 100;
      incrementalTimer += 1500;
      return new Promise(function(resolve){
        setInterval(resolve, incrementalTimer);
      }).then(function(){
        console.log('company name:', company.name);
        // console.log('inside setInterval', counter);
        return pRequest({

          url: info.nyt.url,
          method: 'GET',
          json: true,
          qs: {
            'api-key': info.nyt.apikey,
            'begin_date': "20170309",
            'page': 0,
            'q': company.name
          }
        });
      });

    });
    Promise.all(promises)
    .then((results) => {
      console.log('in promise all');
      console.log(results);

      results = results.map((result, index) => {
        result.companyName = companies[index].name;
        result.ticker = companies[index].ticker;
        result.imgURL = companies[index].imgURL;
        return result;
      })
      results.forEach(result => {
        console.log(result.response.meta.hits)
        topFive.push(result);
        topFive.sort(function(a, b) {
          return b.response.meta.hits - a.response.meta.hits;
        });
        if (topFive.length > 5) {
          topFive = topFive.slice(0, 5);
          console.log('topFive', topFive);
        }

      });
      //console.log(topFive);
      topFive.forEach(top => {
        const wordFreq = {};
        //console.log(top.response)
        top.response.docs.forEach(doc => {

          if (doc.snippet) {
            console.log(1, doc.snippet);
            //console.log(doc.snippet.replace(/^[a-zA-Z\s]+$/g, ''));
            doc.snippet.replace(/[^\w\s!?]/g,'').split(' ').forEach(word => {
              if (word !== '') {

                if (!wordFreq[word]) {
                  wordFreq[word] = 1;
                } else {
                  ++wordFreq[word];
                }
              }

            });
          }
          if( doc.lead_paragraph) {
            console.log(2, doc.lead_paragraph);
            //console.log(doc.lead_paragraph.replace(/^[a-zA-Z\s]+$/, ''));
            doc.lead_paragraph.replace(/[^\w\s!?]/g,'').split(' ').forEach(word => {
              if (word !== '') {

                if (!wordFreq[word]) {
                  wordFreq[word] = 1;
                } else {
                  ++wordFreq[word];
                }
              }

            });
          }


        });
        console.log('eeeeeerrre', top)
        //input frequencies and topFive to Elasticsearch
        indexName = `trends-${nowISO() + '2'}`;
        client.index({
          index: indexName,
          type: 'article',
          body: {
            company: top.companyName,
            words: wordFreq,
            ticker: top.ticker,
            imgURL: top.imgURL
          }
        }, function(err, resp, status) {
          if (err) {
            console.error(`Error ocurred while indexing document: ${doc}`, 'Error:', err);
          } else {
            console.log('trends in elasticsearch');
          }
        });

      })
    })
    .catch( err => {
      console.error('There was an error with NYT api call.. increase time interval');
    });

  })
  .catch(err => {
    console.error('Error: db error', err);
  })

}

function companyRanks(indexName) {
  //For each company, search elastic so we can get top 5 trending companies.
  console.log('company ranks');
  db.model('company').findAll()
  .then(companies => {
    const promises = [];
    //For each company

    companies.forEach(company => {
      console.log('company.name:', company.name);
      const requestOptions = {
        url: `${info.elasticsearch.protocol}://${info.elasticsearch.host}:${info.elasticsearch.port}/${indexName}/_search`,
        qs: {
          q: company.name
        },
        json: true,
        auth: {
          username: info.elasticsearch.username,
          password: info.elasticsearch.password,
        },
        method: 'GET'
      };
      //console.log('request option', requestOptions);

      reqPromise = pRequest(requestOptions);
      promises.push(reqPromise);
      reqPromise
      .then(result => {
        //console.log(result);

        if (result.hits) {
          // console.log(result.hits.total);
          company.hits = result.hits.total;
          console.log('company name:', company.name, 'hits:', company.hits);
        } else {
          console.error('request failed', result.error);
        }
      })
      .catch(err => {

        console.log('request to elastic failed', err);
      })

      // setTimeout(function() {

      // }, 1000);

    });


    // Promise.all(promises)
    // .then(results => {
    //   results.forEach(result => {
    //     console.log(result);
    //   });
    // })

  })
  .catch(err => {
    console.error('DB error. Failed to get list of companies', err);
  })
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

module.exports = server;
