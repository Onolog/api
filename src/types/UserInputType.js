import {GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    distanceUnits: {
      type: GraphQLInt,
    },
    location: {
      type: GraphQLString,
    },
    timezone: {
      type: GraphQLString,
    },
  },
});
