'use strict';

const moment = require('moment-timezone');

/**
 * Add a `created_at` field to the `users` table and populate with ISO date
 * string version of the `created` field.
 */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'created_at', {
      type: Sequelize.DataTypes.STRING(30),
      allowNull: false,
    });

    const users = await queryInterface.sequelize.query(
      'SELECT id, created FROM users'
    );

    users[0].forEach(async(user) => {
      await queryInterface.sequelize.query(`
        UPDATE users
        SET created_at = :created_at
        WHERE id = :id
      `, {
        replacements: {
          created_at: moment(user.created).format(),
          id: user.id,
        },
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'created_at');
  },
};
