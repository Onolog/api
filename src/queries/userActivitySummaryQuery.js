import { GraphQLID, GraphQLNonNull } from 'graphql';
import { resolver } from 'graphql-sequelize';
import moment from 'moment-timezone';
import { Op } from 'sequelize';

import { Activity } from '../models';
import { UserActivitySummaryType } from '../types';
import summarizeActivities from '../utils/summarizeActivities';

const userActivitySummaryQuery = {
  type: new GraphQLNonNull(UserActivitySummaryType),
  args: {
    userId: {
      description: 'ID of user',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: resolver(Activity, {
    list: true,
    before: (options, args, context) => {
      // Get all activities for the current year and filter down later.
      const startDate = moment().startOf('year').subtract(1, 'day').format();
      const endDate = moment().endOf('year').add(1, 'day').format();

      return {
        ...options,
        where: {
          userId: args.userId,
          startDate: { [Op.between]: [startDate, endDate] },
        },
      };
    },
    after: summarizeActivities,
  }),
};

export default userActivitySummaryQuery;
