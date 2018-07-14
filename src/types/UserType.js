import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {attributeFields, resolver} from 'graphql-sequelize';
import {Op} from 'sequelize';

import ActivitiesType from './ActivitiesType';
import ShoesType from './ShoesType';
import UserActivitySummaryType from './UserActivitySummaryType';

import {User} from '../models';
import getActivityObject from '../utils/getActivityObject';
import prepareActivityQuery from '../utils/prepareActivityQuery';
import summarizeActivities from '../utils/summarizeActivities';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    ...attributeFields(User),
    activities: {
      type: new GraphQLNonNull(ActivitiesType),
      args: {
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        order: {
          type: GraphQLString,
        },
        range: {
          description: 'Date range to query',
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: resolver(User.Activities, {
        before: prepareActivityQuery,
        after: getActivityObject,
      }),
    },
    // TODO: Should this just be a field on the ActivityType?
    activitySummary: {
      type: new GraphQLNonNull(UserActivitySummaryType),
      resolve: resolver(User.Activities, {
        list: true,
        // before: (options, args, context) => {},
        after: summarizeActivities,
      }),
    },
    shoes: {
      type: ShoesType,
      resolve: resolver(User.Shoes, {
        after: (results) => ({
          count: results.length,
          nodes: results,
        }),
      }),
    },
  }),
});
