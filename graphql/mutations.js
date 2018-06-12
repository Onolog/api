import {GraphQLBoolean, GraphQLID, GraphQLNonNull} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {UserInputType, UserType} from './types';

function assertCanEdit({user}, userId) {
  if (user && (user.id === userId || user.admin)) {
    return;
  }
  throw new Error('You do not have permission to update this user.');
}

const createUser = ({User}) => ({
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

const findOrCreateUser = ({User}) => ({
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

const updateUser = ({User}) => ({
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

    const user = await User.findById(id);

    if (user) {
      return await user.update(input);
    }

    throw Error('There are no users with that ID.');
  },
});

const deleteUser = ({User}) => ({
  type: new GraphQLNonNull(GraphQLBoolean),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async function(root, {id}, context) {
    assertCanEdit(context, id);
    const user = await User.findById(id);

    if (user) {
      return await user.destroy();
    }

    throw Error('There are no users with that ID.');
  },
});

export default (models) => ({
  createUser: createUser(models),
  deleteUser: deleteUser(models),
  findOrCreateUser: findOrCreateUser(models),
  updateUser: updateUser(models),
});
