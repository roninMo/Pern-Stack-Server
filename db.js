const Pool = require("pg").Pool;

const pool = new Pool({
  user: "Postgres",
  password: "Kieran30437",
  host: "localhost",
  port: 5432,
  database: "pern_stack",
});

module.exports = pool;
