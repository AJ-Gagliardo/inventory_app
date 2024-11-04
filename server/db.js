const Pool = require("pg").Pool;
require("dotenv").config();

// // //this is for my local computer
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dbport = process.env.DBPORT;
const db = process.env.DATABASE;

const pool = new Pool({
  user: user,
  password: password,
  host: host,
  port: dbport,
  database: db,
});

// this is with railway
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });

module.exports = pool;
