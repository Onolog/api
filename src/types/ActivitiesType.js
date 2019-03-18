import { GraphQLObjectType } from 'graphql';

import ActivityType from './ActivityType';
import { CountField, NodesField, SumDistanceField } from './fields';

export default new GraphQLObjectType({
  name: 'Activities',
  fields: {
    ...CountField,
    ...NodesField(ActivityType),
    ...SumDistanceField,
  },
});
