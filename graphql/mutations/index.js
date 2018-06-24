import {GraphQLBoolean, GraphQLID, GraphQLNonNull} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {User} from '../../models';
import {UserInputType, UserType} from '../types';
import {assertCanEdit} from '../utils';

const createUser = () => ({
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
    await User.create({...input, id});
    return await resolver(User)(root, {id}, context, info);
  },
});

const login = () => ({
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
});

const updateUser = () => ({
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    input: {
      type: new GraphQLNonNull(UserInputType),
    },
  },
  resolve: async(root, {id, input}, context) => {
    assertCanEdit(context, id);

    try {
      const user = await User.findById(id);
      return await user.update(input);
    } catch (err) {
      throw Error(err);
    }
  },
});

const deleteUser = () => ({
  type: new GraphQLNonNull(GraphQLBoolean),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async function(root, {id}, context) {
    assertCanEdit(context, id);

    try {
      const user = await User.findById(id);
      return await user.destroy();
    } catch (err) {
      throw Error(err);
    }
  },
});

export default {
  createUser: createUser(),
  deleteUser: deleteUser(),
  login: login(),
  updateUser: updateUser(),
};
