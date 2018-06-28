import {GraphQLID, GraphQLInt, GraphQLNonNull} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {Brand, Shoe} from '../models';
import {ShoesType} from '../types';

import getId from '../utils/getId';
import addShoeName from '../utils/addShoeName';

const shoesQuery = {
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
          {model: Brand},
        ],
        where,
      };
    },
    after: (results) => ({
      count: results.length,
      nodes: results.map(addShoeName),
    }),
  }),
};

export default shoesQuery;
