import {GraphQLObjectType, GraphQLSchema} from 'graphql';

// Queries
import activities from './queries/activitiesQuery';
import brands from './queries/brandsQuery';
import garminActivity from './queries/garminActivityQuery';
import garminActivityDetails from './queries/garminActivityDetailsQuery';
import shoes from './queries/shoesQuery';
import user from './queries/userQuery';
import userActivitySummary from './queries/userActivitySummaryQuery';
import users from './queries/usersQuery';

// Mutations
// import {createActivity, deleteActivity, updateActivity} from './mutations/activityMutations';
import {createShoe, deleteShoe, updateShoe} from './mutations/shoeMutations';
import {login, updateUser} from './mutations/userMutations';

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      // createActivity,
      // deleteActivity,
      // updateActivity,
      createShoe,
      deleteShoe,
      updateShoe,
      login,
      updateUser,
    },
  }),
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      activities,
      brands,
      garminActivity,
      garminActivityDetails,
      shoes,
      user,
      userActivitySummary,
      users,
    },
  }),
});
