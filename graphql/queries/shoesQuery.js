import {GraphQLID, GraphQLInt, GraphQLNonNull} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {Activity, Brand, Shoe, User} from '../../models';
import {ShoesType} from '../types';
import {getId, getSumDistance} from '../utils';

const shoesQuery = () => ({
  type: new GraphQLNonNull(ShoesType),
  args: {
    limit: {
      description: 'The number of results to return',
      type: GraphQLInt,
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
  resolve: resolver(Shoe, {
    list: true,
    before: (options, args, context) => {
      const shoeId = getId(args.shoeId);
      const userId = getId(args.userId);

      let where = {};
      if (shoeId) {
        where.id = shoeId;
      } else if (userId) {
        where.userId = userId;
      }

      return {
        ...options,
        include: [
          {model: Activity},
          {model: Brand},
          {model: User},
        ],
        where,
      };
    },
    after: (results) => {
      results.map((result) => {
        // Add the shoe's activity data.
        const activities = result.Activities;
        result.activities = {
          count: activities.length,
          sumDistance: getSumDistance(activities),
          nodes: activities,
        };

        // Add the shoe's brand data.
        result.brand = result.Brand.name;
        result.name = `${result.brand} ${result.model}`;

        result.user = result.User;
        return result;
      });

      return {
        count: results.length,
        nodes: results,
      };
    },
  }),
});

export default shoesQuery;
