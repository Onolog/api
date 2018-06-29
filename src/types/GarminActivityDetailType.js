import {GraphQLInt, GraphQLFloat, GraphQLObjectType, GraphQLString} from 'graphql';

export default new GraphQLObjectType({
  name: 'GarminActivityDetail',
  fields: {
    sumElapsedDuration: {
      type: GraphQLInt,
    },
    sumMovingDuration: {
      type: GraphQLInt,
    },
    directLongitude: {
      type: GraphQLFloat,
    },
    sumDistance: {
      type: GraphQLFloat,
    },
    directTimestamp: {
      type: GraphQLString,
    },
    sumDuration: {
      type: GraphQLInt,
    },
    directCorrectedElevation: {
      type: GraphQLFloat,
    },
    directLatitude: {
      type: GraphQLFloat,
    },
    directHeartRate: {
      type: GraphQLInt,
    },
    directUncorrectedElevation: {
      type: GraphQLFloat,
    },
    directSpeed: {
      type: GraphQLFloat,
    },
    directElevation: {
      type: GraphQLFloat,
    },
    directVerticalSpeed: {
      type: GraphQLFloat,
    },
  },
});
