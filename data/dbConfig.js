const knex = require('knex');
const knexConfig = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'production';


module.exports = knex(knexConfig[environment]);
