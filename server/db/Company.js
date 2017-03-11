const Sequelize = require('sequelize');
const db = require('./_db');

var Company = db.define('company', {
  ticker: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  sector: {
    type: Sequelize.STRING
  }
}, {
    getterMethods: {

    },
    classMethods: {

    },
    instanceMethods: {

    }
});

module.exports = Company;
