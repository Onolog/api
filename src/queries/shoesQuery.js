import { GraphQLID, GraphQLNonNull } from 'graphql';
import { resolver } from 'graphql-sequelize';

import { Brand, Shoe } from '../models';
import { ShoesType } from '../types';
import { LimitField } from '../types/fields';

const shoesQuery = {
  type: new GraphQLNonNull(ShoesType),
  args: {
    id: {
      description: 'ID of shoe',
      type: GraphQLID,
    },
    userId: {
      description: 'ID of user',
      type: GraphQLID,
    },
    ...LimitField,
  },
  resolve: resolver(Shoe, {
    list: true,
    before: (options, args, context) => ({
      ...options,
      include: [{ model: Brand }],
    }),
    after: (results) => ({
      count: results.length,
      nodes: results,
    }),
  }),
};

export default shoesQuery;
