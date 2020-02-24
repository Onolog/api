import { GraphQLID, GraphQLNonNull } from 'graphql';
import moment from 'moment-timezone';

import { Sequelize, User } from '../models';
import { UserInputType, UserType } from '../types';
import { updateRecord } from '../utils/mutationUtils';

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
  resolve: async (root, { id, input }, context, info) => {
    try {
      // Check several fields to see if the user logging in matches one already
      // in the DB. Filter out fields with empty values, to avoid matching on
      // `null`.
      const where = {
        [Sequelize.Op.or]: [
          { id },
          { email: input.email },
          { providerId: id },
        ].filter((item) => !!Object.values(item)[0]),
      };
      const dateString = moment().format();
      const [user, wasCreated] = await User.findOrCreate({
        defaults: {
          ...input,
          created: dateString,
          createdAt: dateString,
          id,
          lastLogin: dateString,
          updatedAt: dateString,
          providerId: id,
        },
        where,
      });

      if (!wasCreated && !user.providerId) {
        await user.update({ providerId: id });
      }

      return user;
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
