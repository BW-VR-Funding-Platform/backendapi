require("dotenv").config(); //access to .env variables
// Update with your config settings.
const knex = require("knex");
const pgConnection =
  process.env.DATABASE_URL ||
  "postgres://xuhmadekezmvyo:5cb99aa9c662e2d719e4806b941190fb48162f155923004ea890559cf8ec2ff7@ec2-3-95-87-221.compute-1.amazonaws.com:5432/d19mvvefqhb5pg";

module.exports = knex(pgConnection);
module.exports = {
  //development
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, 
    connection: {
      filename: './data/project.db3',
    },
    migrations: {
      directory: '.migrations'
    },
    seeds:{
      directory: './seeds'
    },
    // needed when using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
