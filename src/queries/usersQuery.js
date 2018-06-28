import {GraphQLID, GraphQLList} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {User} from '../models';
import {UserType} from '../types';
import getId from '../utils/getId';

const usersQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      description: 'ID of user',
      type: GraphQLID,
    },
  },
  resolve: resolver(User, {
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

export default usersQuery;
