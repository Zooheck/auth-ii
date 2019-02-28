// Update with your config settings.
require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/workspace.sqlite3'
    },
    useNullAsDefault: true
  },



  production: {
    client: 'pg', //CHANGED THIS
    // connection: {
    //   database: 'my_db',
    //   user:     'username',
    //   password: 'password'
    // }, DONT NEED THIS YO
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
