'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'provider_id', {
      type: Sequelize.DataTypes.STRING(32),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'provider_id');
  }
};
