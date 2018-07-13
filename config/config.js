require('dotenv').config();

module.exports = {
  development: {
    database: 'onolog-dev',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    port: 8889,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
};
