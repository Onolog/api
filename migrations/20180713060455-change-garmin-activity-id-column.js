'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('activities', 'garmin_activity_id', {
      type: Sequelize.DataTypes.STRING(20),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('activities', 'garmin_activity_id', {
      type: Sequelize.DataTypes.INTEGER(11).UNSIGNED,
    });
  },
};
