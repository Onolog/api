import {GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';

export const CountField = {
  count: {
    type: new GraphQLNonNull(GraphQLInt),
  },
};

export const LimitField = {
  limit: {
    description: 'The number of results to return',
    type: GraphQLInt,
  },
};

export const OrderField = {
  order: {
    description: 'The order in which to return the results',
    type: GraphQLString,
  },
};

export const NodesField = (type) => ({
  nodes: {
    type: new GraphQLList(type),
  },
});

export const RangeField = {
  range: {
    description: 'Date range to query',
    type: new GraphQLList(GraphQLString),
  },
};

export const SumDistanceField = {
  sumDistance: {
    type: new GraphQLNonNull(GraphQLFloat),
  },
};
