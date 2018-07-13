'use strict';

/**
 * Remove the `login` index and `password` field from the `users` table, since
 * these aren't needed.
 */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.removeIndex('users', 'login');
    await queryInterface.removeColumn('users', 'password');
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.DataTypes.STRING(40),
      allowNull: true,
      defaultValue: '',
    });

    await queryInterface.addIndex('users', {
      fields: ['email', 'password'],
      unique: false,
      name: 'login',
    });
  },
};
