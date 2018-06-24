import {GraphQLObjectType, GraphQLSchema} from 'graphql';

import activities from './queries/activitiesQuery';
import brands from './queries/brandsQuery';
import garminActivity from './queries/garminActivityQuery';
import shoes from './queries/shoesQuery';
import user from './queries/userQuery';
import userActivitySummary from './queries/userActivitySummaryQuery';
import users from './queries/usersQuery';

import mutations from './mutations';

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => mutations,
  }),
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      activities,
      brands,
      garminActivity,
      shoes: shoes(),
      user,
      userActivitySummary: userActivitySummary(),
      users,
    }),
  }),
});
