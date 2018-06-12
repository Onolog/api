import {GraphQLObjectType, GraphQLSchema} from 'graphql';

import models from '../models';
import mutations from './mutations';
import queries from './queries';

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: mutations(models),
  }),
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: queries(models),
  }),
});
