import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {resolver} from 'graphql-sequelize';
import {Op} from 'sequelize';

import {Activity, Shoe, User} from '../../models';
import {ActivitiesType} from '../types';
import {getId, getSumDistance} from '../utils';

const activitiesQuery = {
  type: new GraphQLNonNull(ActivitiesType),
  args: {
    activityId: {
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
      const activityId = getId(args.activityId);
      const shoeId = getId(args.shoeId);
      const userId = getId(args.userId);

      const where = {};

      if (args.range) {
        where.startDate = {[Op.between]: args.range};
      }

      if (activityId) {
        where.id = activityId;
      } else if (shoeId) {
        where.shoeId = shoeId;
      } else if (userId) {
        where.userId = userId;
      }

      return {
        ...options,
        include: [
          {model: Shoe},
          {model: User},
        ],
        // Order from newest to oldest.
        order: [['startDate', 'DESC']],
        where,
      };
    },
    after: (results) => {
      results = results.map((result) => {
        result.shoe = result.Shoe;
        result.user = result.User;
        return result;
      });

      return {
        count: results.length,
        nodes: results,
        sumDistance: getSumDistance(results),
      };
    },
  }),
};

export default activitiesQuery;
