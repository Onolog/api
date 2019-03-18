import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { attributeFields, resolver } from 'graphql-sequelize';

import ActivitiesType from './ActivitiesType';
import ShoesType from './ShoesType';
import UserActivitySummaryType from './UserActivitySummaryType';

import { Brand, User } from '../models';
import { LimitField, OrderField, RangeField } from './fields';
import resolveActivities from '../utils/resolveActivities';
import summarizeActivities from '../utils/summarizeActivities';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    ...attributeFields(User),
    activities: {
      type: new GraphQLNonNull(ActivitiesType),
      args: {
        ...LimitField,
        ...OrderField,
        ...RangeField,
      },
      resolve: resolveActivities(User.Activities),
    },
    // TODO: Should this just be a field on the ActivityType?
    activitySummary: {
      type: new GraphQLNonNull(UserActivitySummaryType),
      resolve: resolver(User.Activities, {
        list: true,
        after: summarizeActivities,
      }),
    },
    shoes: {
      type: ShoesType,
      resolve: resolver(User.Shoes, {
        before: (options, args, context) => ({
          ...options,
          include: [{ model: Brand }],
        }),
        after: (results) => ({
          count: results.length,
          nodes: results,
        }),
      }),
    },
  }),
});
