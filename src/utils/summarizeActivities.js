import moment from 'moment-timezone';

const INCLUSIVE = '[]';
const PERIODS = ['week', 'month', 'year'];

/**
 * Summarizes all the activities for a given range of time into count and total
 * distance for the current week, month, and year.
 */
export default (activities) => {
  const summary = {};

  PERIODS.forEach((period) => {
    summary[period] = {
      count: 0,
      sumDistance: 0,
    };
  });

  return activities.reduce((accumulator, activity) => {
    const { distance, startDate, timezone } = activity;
    const start = moment(startDate).tz(timezone);

    const acc = accumulator;

    PERIODS.forEach((period) => {
      if (
        start.isBetween(
          moment().tz(timezone).startOf(period),
          moment().tz(timezone).endOf(period),
          null,
          INCLUSIVE,
        )
      ) {
        acc[period] = {
          count: acc[period].count + 1,
          sumDistance: acc[period].sumDistance + +distance,
        };
      }
    });

    return acc;
  }, summary);
};
