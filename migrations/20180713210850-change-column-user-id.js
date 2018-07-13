'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'id', {
      type: Sequelize.DataTypes.STRING(20),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'id', {
      type: Sequelize.DataTypes.BIGINT.UNSIGNED,
    });
  },
};
