const Poll = require("pg").Pool;

const pool = new Poll({
  user: "postgres",
  password: "demion2289",
  host: "localhost",
  port: 5432,
  database: "contact",
});

exports.pool = pool;
