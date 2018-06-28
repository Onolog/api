import {GraphQLID, GraphQLNonNull} from 'graphql';

import {User} from '../models';
import {UserInputType, UserType} from '../types';
import {updateRecord} from '../utils/mutationUtils';

export const login = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    input: {
      type: new GraphQLNonNull(UserInputType),
    },
  },
  resolve: async(root, {id, input}, context, info) => {
    try {
      const user = await User.findOrCreate({
        defaults: {...input, id},
        where: {id},
      });
      return user.length ? user[0] : user;
    } catch (err) {
      throw Error(err);
    }
  },
};

export const updateUser = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    input: {
      type: new GraphQLNonNull(UserInputType),
    },
  },
  resolve: updateRecord(User),
};
