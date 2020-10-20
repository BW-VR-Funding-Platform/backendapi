require("dotenv").config(); //access to .env variables
// Update with your config settings.
const knex = require("knex");
const pgConnection =
  process.env.DATABASE_URL ||
  "postgres://xuhmadekezmvyo:5cb99aa9c662e2d719e4806b941190fb48162f155923004ea890559cf8ec2ff7@ec2-3-95-87-221.compute-1.amazonaws.com:5432/d19mvvefqhb5pg";

module.exports = knex(pgConnection);
module.exports = {
  development: {
    client: "sqlite3", 
    useNullAsDefault: true,
    connection: {
      filename: "./data/project.db3",
      migrations: {
        directory: "./migrations",
      },
      seed: {
        directory: "./seeds",
      },
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    useNullAsDefault: true,
    connection: {
      filename: "./data/project.db3",
    },
    migrations: {
      directory: "./migrations",
    },
    seed: {
      directory: "./seeds",
    },

    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
