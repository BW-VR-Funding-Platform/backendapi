require("dotenv").config(); //access to .env variables
// Update with your config settings.

const pgConnection = process.env.DATABASE_URL;

module.exports = {
  //development
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/project.db3",
    },
    migrations: {
      directory: ".migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    // needed when using foreign keys
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
    connection: pgConnection,
    useNullAsDefault: true,
    // client: "postgresql",
    client: "pg",
    migrations: {
      directory: "./migrations",
    },
    migrations: {
      directory: "./migrations",
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
