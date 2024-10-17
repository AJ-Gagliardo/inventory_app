const Pool = require("pg").Pool;
require("dotenv").config();

const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const db = process.env.DATABASE;

const pool = new Pool({
  user: user,
  password: password,
  host: host,
  port: port,
  database: db,
});

module.exports = pool;
