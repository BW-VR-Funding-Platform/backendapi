// Update with your config settings.
require("dotenv").config(); //access to .env variables
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/project.db3",
      migrations: {
        directory: "./data/migrations",
      },
      seed: {
        directory: "./data/seeds",
      },
      pool: {
        afterCreate: (conn, done) => {
          // runs after a connection is made to the sqlite engine
          conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
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
  },
};
