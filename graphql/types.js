import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {attributeFields} from 'graphql-sequelize';

import {activitiesQuery, shoesQuery} from './queries';
import {Activity, Brand, Shoe, User} from '../models';

export const ActivityType = new GraphQLObjectType({
  name: 'Activity',
  description: 'An activity',
  fields: attributeFields(Activity),
});

export const ActivitiesType = new GraphQLObjectType({
  name: 'Activities',
  description: 'A set of activities',
  fields: {
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The total number of activities',
    },
    nodes: {
      type: new GraphQLList(ActivityType),
      description: 'The list of activities',
    },
    sumDistance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'The total distance of the activities',
    },
  },
});

export const BrandType = new GraphQLObjectType({
  name: 'Brand',
  description: 'A brand',
  fields: attributeFields(Brand),
});

export const ShoeType = new GraphQLObjectType({
  name: 'Shoe',
  description: 'A shoe',
  fields: () => ({
    ...attributeFields(Shoe),
    activities: activitiesQuery({Activity}),
  }),
});

export const ShoesType = new GraphQLObjectType({
  name: 'Shoes',
  description: 'A set of shoes',
  fields: {
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The total number of shoes',
    },
    nodes: {
      type: new GraphQLList(ShoeType),
      description: 'The list of shoes',
    },
  },
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'The user fields that may be created or updated.',
  fields: () => ({
    firstName: {
      description: 'The user\'s first name',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      description: 'The user\'s last name',
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      description: 'The user\'s email address',
      type: new GraphQLNonNull(GraphQLString),
    },
    location: {
      description: 'The user\'s lcation (city & state/province)',
      type: GraphQLString,
    },
  }),
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    ...attributeFields(User),
    activities: activitiesQuery({Activity}),
    shoes: shoesQuery({Shoe}),
  }),
});
