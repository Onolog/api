import {GraphQLNonNull, GraphQLObjectType} from 'graphql';

import ActivitySummaryType from './ActivitySummaryType';

export default new GraphQLObjectType({
  name: 'UserActivitySummary',
  fields: () => ({
    week: {
      type: new GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current week',
    },
    month: {
      type: new GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current month',
    },
    year: {
      type: new GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current year',
    },
  }),
});
