require('dotenv').config();// ADDED THIS

const knex = require('knex');

const knexConfig = require('./knexfile.js');
const environment = process.env.ENVIRONMENT || 'development'; // ADDED THIS
// module.exports = knex(knexConfig.development); OLD VERSION
module.exports = knex(knexConfig[environment]);