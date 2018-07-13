'use strict';

const moment = require('moment-timezone');

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'updated_at', {
      type: Sequelize.DataTypes.STRING(30),
      allowNull: false,
    });

    const users = await queryInterface.sequelize.query(
      'SELECT id, last_login FROM users'
    );

    users[0].forEach(async(user) => {
      await queryInterface.sequelize.query(`
        UPDATE users
        SET updated_at = :updated_at
        WHERE id = :id
      `, {
        replacements: {
          updated_at: moment(user.last_login).format(),
          id: user.id,
        },
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'updated_at');
  },
};
