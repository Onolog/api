import {GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull} from 'graphql';

export const CountField = {
  count: {
    type: new GraphQLNonNull(GraphQLInt),
  },
};

export const NodesField = (type) => ({
  nodes: {
    type: new GraphQLList(type),
  },
});

export const SumDistanceField = {
  sumDistance: {
    type: new GraphQLNonNull(GraphQLFloat),
  },
};
