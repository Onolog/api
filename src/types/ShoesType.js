import {GraphQLObjectType} from 'graphql';

import ShoeType from './ShoeType';
import {CountField, NodesField} from './fields';

export default new GraphQLObjectType({
  name: 'Shoes',
  fields: () => ({
    ...CountField,
    ...NodesField(ShoeType),
  }),
});
