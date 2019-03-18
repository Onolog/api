import { GraphQLID, GraphQLList } from 'graphql';
import { resolver } from 'graphql-sequelize';

import { Brand } from '../models';
import { BrandType } from '../types';

export default {
  type: new GraphQLList(BrandType),
  args: {
    id: {
      description: 'ID of the brand',
      type: GraphQLID,
    },
  },
  resolve: resolver(Brand, {
    list: true,
  }),
};
