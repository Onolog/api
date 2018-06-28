import moment from 'moment-timezone';

const INCLUSIVE = '[]';
const PERIODS = ['week', 'month', 'year'];

const summary = {};
PERIODS.forEach((period) => {
  summary[period] = {
    count: 0,
    sumDistance: 0,
  };
});

/**
 * Summarizes all the activities for a given range of time into count and total
 * distance for the current week, month, and year.
 */
export default (activities) => activities.reduce((accum, activity) => {
  const {distance, startDate, timezone} = activity;
  const start = moment(startDate).tz(timezone);

  PERIODS.forEach((period) => {
    if (
      start.isBetween(
        moment().tz(timezone).startOf(period),
        moment().tz(timezone).endOf(period),
        null,
        INCLUSIVE,
      )
    ) {
      accum[period] = {
        count: accum[period].count + 1,
        sumDistance: accum[period].sumDistance + +distance,
      };
    }
  });

  return accum;
}, summary);
