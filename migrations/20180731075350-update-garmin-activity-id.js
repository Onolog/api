'use strict';

const SELECT_QUERY = `
  SELECT *
  FROM activities
  WHERE notes
  LIKE '%connect.garmin.com%'
`;

const UPDATE_QUERY = `
  UPDATE activities
  SET garmin_activity_id = :garminActivityId
  WHERE id = :id
`;

/**
 * Before the ability to import Garmin activities existed, the activity URL was
 * simply added to the notes as a reference. This migration adds the id to the
 * designated field so that the reference exists in a more structured way.
 */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    // Get all the activities with a free-form garmin link.
    const activities = await queryInterface.sequelize.query(SELECT_QUERY);

    activities[0].forEach(async(activity) => {
      // Naively extract the Garmin ID. The URLs always come last in the notes.
      const garminActivityId = activity.notes.split('/activity/').pop().trim();

      await queryInterface.sequelize.query(UPDATE_QUERY, {
        replacements: {
          id: activity.id,
          garminActivityId,
        },
      });
    });
  },

  down: async(queryInterface, Sequelize) => {
    const activities = await queryInterface.sequelize.query(SELECT_QUERY);

    // Reset the garmin id to `null`.
    activities[0].forEach(async(activity) => {
      await queryInterface.sequelize.query(UPDATE_QUERY, {
        replacements: {
          id: activity.id,
          garminActivityId: null,
        },
      });
    });
  }
};
