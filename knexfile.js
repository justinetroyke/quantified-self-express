// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/tracker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: 'postgres://localhost/tracker',
    migrations: {
      directory: './db/migrations'
    },
    userNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    userNullAsDefault: true
  }
};
