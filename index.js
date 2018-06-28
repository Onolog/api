// Load environment variables.
require('dotenv').config();

require('babel-polyfill');
require('babel-register');

require('./src/server');
