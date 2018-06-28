import {GraphQLID, GraphQLNonNull} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {User} from '../models';
import {UserType} from '../types';

const userQuery = {
  type: UserType,
  args: {
    id: {
      description: 'ID of user',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: resolver(User, {
    after: (result) => (result.length ? result[0] : result),
  }),
};

export default userQuery;
