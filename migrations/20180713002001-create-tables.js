'use strict';

const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      const initialSchema = fs.readFileSync(__dirname + '/initial.sql', {
        encoding: 'utf8',
      });

      // Need to split on ';' to get the individual CREATE TABLE sql
      // as the queryInterface can only execute one query at a time.
      const tables = initialSchema.split(';');

      tables.forEach(async(tableSql) => {
        await queryInterface.sequelize.query(tableSql);
      });
    } catch (err) {
      throw Error(err);
    }
  },

  down: async(queryInterface, Sequelize) => {
    try {
      const names = await queryInterface.showAllTables();

      // Don't drop the SequelizeMeta table
      const tables = names.filter((name) => (
        name.toLowerCase() !== 'sequelizemeta'
      ));

      tables.forEach(async(table) => {
        await queryInterface.dropTable(table);
      });
    } catch (err) {
      throw Error(err);
    }
  }
};
