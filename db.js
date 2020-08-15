const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '123123', // Declare database password here
  host: 'localhost', // Declare database password here
  port: '5432', // Declare port here
  database: 'redis', // Declare database name here
});

module.exports = pool;
