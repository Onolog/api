import {GraphQLID, GraphQLList} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {User} from '../models';
import {UserType} from '../types';

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
  }),
};

export default usersQuery;
