import {GraphQLID, GraphQLInt, GraphQLNonNull} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {Brand, Shoe} from '../models';
import {ShoesType} from '../types';

const shoesQuery = {
  type: new GraphQLNonNull(ShoesType),
  args: {
    limit: {
      description: 'The number of results to return',
      type: GraphQLInt,
    },
    id: {
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
    before: (options, args, context) => ({
      ...options,
      include: [{model: Brand}],
    }),
    after: (results) => ({
      count: results.length,
      nodes: results,
    }),
  }),
};

export default shoesQuery;
