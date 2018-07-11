import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {resolver} from 'graphql-sequelize';
import {Op} from 'sequelize';

import {Activity} from '../models';
import {ActivitiesType} from '../types';
import getActivityObject from '../utils/getActivityObject';

const activitiesQuery = {
  type: new GraphQLNonNull(ActivitiesType),
  args: {
    id: {
      description: 'ID of an activity',
      type: GraphQLID,
    },
    limit: {
      description: 'The number of results to return',
      type: GraphQLInt,
    },
    range: {
      description: 'Date range to query',
      type: new GraphQLList(GraphQLString),
    },
    shoeId: {
      description: 'ID of shoe',
      type: GraphQLID,
    },
    userId: {
      description: 'ID of user',
      type: GraphQLID,
    },
  },
  resolve: resolver(Activity, {
    list: true,
    before: (options, args, context) => {
      const where = options.where || {};

      if (args.range) {
        where.startDate = {[Op.between]: args.range};
      }

      return {
        ...options,
        // Order from newest to oldest.
        order: [['startDate', 'DESC']],
        where,
      };
    },
    after: getActivityObject,
  }),
};

export default activitiesQuery;
