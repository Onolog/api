import {GraphQLID, GraphQLList} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {Brand} from '../../models';
import {BrandType} from '../types';
import {getId} from '../utils';

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
    before: (options, args, context) => {
      const id = getId(args.id);

      return {
        ...options,
        where: id ? {id} : {},
      };
    },
  }),
};
