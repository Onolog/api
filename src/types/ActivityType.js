import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { attributeFields, resolver } from 'graphql-sequelize';

import { Activity, Brand } from '../models';

import GarminActivityDetailType from './GarminActivityDetailType';
import ShoeType from './ShoeType';
import UserType from './UserType';

import getGarminActivityDetails from '../utils/getGarminActivityDetails';

export default new GraphQLObjectType({
  name: 'Activity',
  fields: () => ({
    ...attributeFields(Activity),
    details: {
      type: new GraphQLList(GarminActivityDetailType),
      resolve: ({ garminActivityId }, args, context) => (
        garminActivityId ? getGarminActivityDetails(garminActivityId) : null
      ),
    },
    shoe: {
      type: ShoeType,
      resolve: resolver(Activity.Shoe, {
        before: (options, args, context) => ({
          ...options,
          include: [{ model: Brand }],
        }),
      }),
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: resolver(Activity.User),
    },
  }),
});
