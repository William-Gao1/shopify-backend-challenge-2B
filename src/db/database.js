const config = {schema: 'inventory'};

const pgp = require("pg-promise")(config);

const cn = {
  connectionString: process.env.DATABASE_URL,
  max: 10
};

const db = pgp(cn);

module.exports = db;