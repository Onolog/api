import {GraphQLID, GraphQLNonNull} from 'graphql';
import {resolver} from 'graphql-sequelize';
import moment from 'moment-timezone';
import {Op} from 'sequelize';

import {Activity} from '../../models';
import {UserActivitySummaryType} from '../types';
import {getId} from '../utils';

const INCLUSIVE = '[]';
const PERIODS = ['week', 'month', 'year'];

const userActivitySummaryQuery = () => ({
  type: new GraphQLNonNull(UserActivitySummaryType),
  args: {
    userId: {
      description: 'ID of user',
      type: GraphQLID,
    },
  },
  resolve: resolver(Activity, {
    list: true,
    before: (options, args, context) => {
      const userId = getId(args.userId);

      // Get all activities for the current year and filter down later.
      const startDate = moment().startOf('year').subtract(1, 'day').format();
      const endDate = moment().endOf('year').add(1, 'day').format();

      return {
        ...options,
        where: {
          userId,
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
      };
    },
    after: (results) => {
      const summary = {};

      PERIODS.forEach((period) => {
        summary[period] = {
          count: 0,
          sumDistance: 0,
        };
      });

      return results.reduce((accum, {distance, startDate, timezone}) => {
        const resultStart = moment(startDate).tz(timezone);

        PERIODS.forEach((period) => {
          if (
            resultStart.isBetween(
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
    },
  }),
});

export default userActivitySummaryQuery;
