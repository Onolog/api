import {GraphQLObjectType} from 'graphql';
import {CountField, SumDistanceField} from './fields';

export default new GraphQLObjectType({
  name: 'ActivitySummary',
  fields: () => ({
    ...CountField,
    ...SumDistanceField,
  }),
});
