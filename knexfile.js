require('dotenv').config()

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'migrations_log',
      directory: './server/migrations'
    },
    seeds: {
      directory: './server/seeders'
    }
  }
}
